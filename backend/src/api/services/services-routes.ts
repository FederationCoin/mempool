import { Application, Request, Response } from 'express';
import config from '../../config';
import WalletApi from './wallets';
import { handleError } from '../../utils/api';

class ServicesRoutes {
  public initRoutes(app: Application): void {
    // Holdings widget always gets a local empty object. Do not proxy
    // mempool.space. Wallet/treasury routes stay behind WALLETS.ENABLED.
    app.get(config.MEMPOOL.API_URL_PREFIX + 'services', this.$getServices);
    app.get(config.MEMPOOL.API_URL_PREFIX + 'services/enterprise/info/:name', this.$getEnterpriseInfo);
    if (!config.WALLETS.ENABLED) {
      return;
    }
    app
      .get(config.MEMPOOL.API_URL_PREFIX + 'wallet/:walletId', this.$getWallet)
      .get(config.MEMPOOL.API_URL_PREFIX + 'treasuries', this.$getTreasuries)
    ;
  }

  private $getServices(_req: Request, res: Response): void {
    res.header('Cache-Control', 'no-store');
    res.status(200).json({});
  }

  private $getEnterpriseInfo(_req: Request, res: Response): void {
    res.header('Cache-Control', 'no-store');
    res.status(200).json({});
  }

  private async $getWallet(req: Request, res: Response): Promise<void> {
    try {
      res.header('Pragma', 'public');
      res.header('Cache-control', 'public');
      res.setHeader('Expires', new Date(Date.now() + 1000 * 5).toUTCString());
      const walletId = req.params.walletId;
      const wallet = await WalletApi.getWallet(walletId);
      if (wallet === null) {
        res.status(404).send('No such wallet');
      } else {
        res.status(200).send(wallet);
      }
    } catch (e) {
      handleError(req, res, 500, 'Failed to get wallet');
    }
  }

  private async $getTreasuries(req: Request, res: Response): Promise<void> {
    try {
      const treasuries = await WalletApi.getTreasuries();
      res.status(200).send(treasuries);
    } catch (e) {
      handleError(req, res, 500, 'Failed to get treasuries');
    }
  }
}

export default new ServicesRoutes();
