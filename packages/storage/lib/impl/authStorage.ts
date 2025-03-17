import type { BaseStorage } from '../base/index.js';
import { createStorage, StorageEnum } from '../base/index.js';

type AccessToken = string | null;

type AccessTokenStorage = BaseStorage<AccessToken> & {
  setAccessToken: (newAccessToken: string) => Promise<void>;
  removeAccessToken: () => Promise<void>;
};

const storage = createStorage<AccessToken>('access-token-key', null, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

// You can extend it with your own methods
export const authStorage: AccessTokenStorage = {
  ...storage,
  setAccessToken: async (newAccessToken: string) => {
    await storage.set(newAccessToken);
  },
  removeAccessToken: async () => {
    await storage.set(null);
  },
};
