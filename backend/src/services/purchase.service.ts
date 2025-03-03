import {Purchase, IPurchase} from '../models/purchase';

export class PurchaseService {
    createPurchase (body: IPurchase){
        return new Promise(async(resolve, reject) => {
            try{
                const purchase = await Purchase.create(body);
                return resolve(purchase);
            }
            catch (e){
                e.source = 'Create Purchase Service';
                return reject(e)
            }
        })
    }

    getAllPurchase (query? : any){
        return new Promise(async(resolve, reject) => {
            try{
                const purchases = await Purchase.find(query);
                return resolve(purchases)
            }
            catch(e){
                e.source = 'Get Purchase Service';
                return reject(e)
            }
        })
    }

    getPurchase (purchaseid: string){
        return new Promise(async(resolve, reject) => {
            try{
                const purchase = await  Purchase.findById(purchaseid);
                if (purchase) return resolve(purchase);

                reject('Purchase Not Found!')
            }
            catch(e){
                e.source = 'Get Purchase Service';
                return reject(e)
            }
        })
    }

    updatePurchase (purchaseid: string, body: [any]) {
        return new Promise(async(resolve, reject) => {
            try{
                let purchase = await Purchase.findById(purchaseid);
                if(!purchase) return reject('Purchase not found!')

                purchase = await Purchase.findByIdAndUpdate(purchaseid, body, { new: true, runValidators: true})
                return resolve(purchase)
            } catch (e){
                e.source = 'Update Purchase Service';
                return reject(e)
            }
        })
    }

    deletePurchase(purchaseid: string) {
        return new Promise(async(resolve, reject) => {
            try{
                let purchase = await Purchase.findById(purchaseid);
                if(!Purchase) return reject('Purchase not found!')

                purchase = await Purchase.findByIdAndDelete(purchaseid)
                return resolve(purchase)
            } catch (e){
                e.source = 'Update Purchase Service';
                return reject(e)
            }
        })
    }

}
