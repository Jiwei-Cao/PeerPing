import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { TOKEN_KEYS } from '@constants';

// SecureStore is not available on web, so we'll use a simple in-memory fallback
const webStorage: { [key: string]: string } = {};

class TokenStorage {
  private isWeb = Platform.OS === 'web';
  
  async getAccessToken(): Promise<string | null> {
    try {
      if (this.isWeb) {
        return webStorage[TOKEN_KEYS.ACCESS_TOKEN] || null;
      }
      return await SecureStore.getItemAsync(TOKEN_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  async getRefreshToken(): Promise<string | null> {
    try {
      if (this.isWeb) {
        return webStorage[TOKEN_KEYS.REFRESH_TOKEN] || null;
      }
      return await SecureStore.getItemAsync(TOKEN_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    try {
      if (this.isWeb) {
        webStorage[TOKEN_KEYS.ACCESS_TOKEN] = accessToken;
        webStorage[TOKEN_KEYS.REFRESH_TOKEN] = refreshToken;
        return;
      }
      await Promise.all([
        SecureStore.setItemAsync(TOKEN_KEYS.ACCESS_TOKEN, accessToken),
        SecureStore.setItemAsync(TOKEN_KEYS.REFRESH_TOKEN, refreshToken),
      ]);
    } catch (error) {
      console.error('Error setting tokens:', error);
      throw error;
    }
  }

  async clearTokens(): Promise<void> {
    try {
      if (this.isWeb) {
        delete webStorage[TOKEN_KEYS.ACCESS_TOKEN];
        delete webStorage[TOKEN_KEYS.REFRESH_TOKEN];
        return;
      }
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEYS.ACCESS_TOKEN),
        SecureStore.deleteItemAsync(TOKEN_KEYS.REFRESH_TOKEN),
      ]);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  async hasValidToken(): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    return !!accessToken;
  }
}

export const tokenStorage = new TokenStorage();