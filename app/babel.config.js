module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@api': './src/api',
            '@features': './src/features',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@stores': './src/stores',
            '@theme': './src/theme'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};