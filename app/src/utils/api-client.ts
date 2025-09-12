import { Configuration, DefaultApi, ResponseError } from '@api';
import { API_BASE_URL, TOKEN_KEYS } from '@constants';
import { tokenStorage } from '@utils/tokenStorage';
import Toast from 'react-native-toast-message';

let apiInstance: DefaultApi | null = null;

class ApiClient {
  private api: DefaultApi;
  private refreshPromise: Promise<void> | null = null;

  constructor() {
    this.api = this.createApiInstance();
  }

  private createApiInstance(): DefaultApi {
    const config = new Configuration({
      basePath: API_BASE_URL,
      middleware: [
        {
          pre: async (context) => {
            const accessToken = await tokenStorage.getAccessToken();
            if (accessToken) {
              context.init.headers = {
                ...context.init.headers,
                Authorization: `Bearer ${accessToken}`,
              };
            }
            return context;
          },
          post: async (context) => {
            if (context.response.status === 401 && !context.url.includes('/auth/')) {
              // Token expired, try to refresh
              if (!this.refreshPromise) {
                this.refreshPromise = this.refreshAccessToken();
              }
              
              await this.refreshPromise;
              this.refreshPromise = null;

              // Retry the original request
              const accessToken = await tokenStorage.getAccessToken();
              if (accessToken) {
                context.init.headers = {
                  ...context.init.headers,
                  Authorization: `Bearer ${accessToken}`,
                };
                return fetch(context.url, context.init);
              }
            }
            return context.response;
          },
        },
      ],
    });

    return new DefaultApi(config);
  }

  private async refreshAccessToken(): Promise<void> {
    try {
      const refreshToken = await tokenStorage.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await this.api.refreshToken({
        refreshRequest: { refreshToken },
      });

      await tokenStorage.setTokens(
        response.accessToken,
        response.refreshToken
      );
    } catch (error) {
      // Refresh failed, clear tokens and redirect to login
      await tokenStorage.clearTokens();
      throw error;
    }
  }

  async handleApiError(error: unknown): Promise<never> {
    if (error instanceof ResponseError) {
      const errorData = await error.response.json();
      
      Toast.show({
        type: 'error',
        text1: errorData.title || 'Error',
        text2: errorData.detail || 'Something went wrong',
      });

      throw errorData;
    }
    
    Toast.show({
      type: 'error',
      text1: 'Network Error',
      text2: 'Please check your connection',
    });
    
    throw error;
  }

  getInstance(): DefaultApi {
    return this.api;
  }
}

export const apiClient = new ApiClient();
export const api = apiClient.getInstance();