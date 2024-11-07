import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction, SerialTransactionExecutor } from '@mysten/sui/transactions';

const PACKAGE_ID = "0x2ecd0db840b24cdf1330b20008704f567cbee21e5ab61c77b52a6aa82b31e59a";
const MODULE_NAME = "proof_of_sui_build";

export class SuiService {
  private client: SuiClient;

  constructor() {
    const rpcUrl = getFullnodeUrl('testnet');
    this.client = new SuiClient({ url: rpcUrl });
  }

  // Hàm thêm ảnh cho từng ngày
  async addImageForDay(day: number, imageUrl: string, proofObjectId: string, signer: Ed25519Keypair) {
    const tx = new Transaction();

    // Set gas budget
    tx.setGasBudget(100000000);

    // Gọi hàm tương ứng với ngày
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::add_img_url_day${String(day).padStart(2, '0')}`,
      arguments: [
        tx.object(proofObjectId),
        tx.pure.string(imageUrl),
        tx.object('0x0000000000000000000000000000000000000000000000000000000000000006'), // System clock
      ],
    });

    try {
      // Sử dụng SerialTransactionExecutor để thực thi transaction
      const executor = new SerialTransactionExecutor({
        client: this.client,
        signer: signer,
      });

      const result = await executor.executeTransaction(tx);
      return result;
    } catch (error) {
      console.error('Error adding image:', error);
      throw error;
    }
  }

  // Hàm lấy tất cả ảnh của một proof object
  async getAllImages(proofObjectId: string) {
    try {
      const objectData = await this.client.getObject({
        id: proofObjectId,
        options: {
          showContent: true,
          showType: true,
        }
      });

      if (!objectData.data?.content) {
        throw new Error("Cannot get proof object");
      }

      const content = objectData.data.content as any;
      const fields = content.fields;

      // Lấy tất cả các cặp url và timestamp
      const images = [];
      for (let i = 1; i <= 10; i++) {
        const dayNum = i.toString().padStart(2, '0');
        const url = fields[`img_url_day${dayNum}`];
        const timestamp = fields[`img_url_day${dayNum}_time`];

        if (url) {
          images.push({
            url,
            timestamp: Number(timestamp),
            day: i
          });
        }
      }

      return images;
    } catch (error) {
      console.error('Error getting images:', error);
      throw error;
    }
  }

  // Hàm lấy exp
  async getExp(proofObjectId: string) {
    try {
      const object = await this.client.getObject({
        id: proofObjectId,
        options: {
          showContent: true,
          showType: true
        }
      });

      if (!object.data?.content) {
        throw new Error("Cannot get proof object");
      }

      const content = object.data.content as any;
      return content.fields.exp;
    } catch (error) {
      console.error('Error getting exp:', error);
      throw error;
    }
  }

  // Hàm lấy balance của address
  async getBalance(address: string) {
    try {
      const balance = await this.client.getBalance({
        owner: address,
      });
      return balance.totalBalance;
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }
} 
