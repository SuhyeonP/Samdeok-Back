const Users=require('../schemas/user')
const Shops=require('../schemas/shop')

const resolvers={
    Query:{
        async allUsers(){
            return await Users.find();
        },
        async getUser(root,{_id}){
            return await Users.findById(_id);
        },
        async allStores(){
            return await Shops.find();
        },
        async getStore(root,{_id}){
            return await Shops.findById(_id);
        },
        async getStoreMaster(root,{masterId}){
            return await Shops.find({masterId:masterId});
        }
    },
    Mutation:{
        async createUser(root,{input}){
            return await Users.create(input)
        },
        async updateUser(root,{_id,input}){
            return await Users.findOneAndUpdate(
                { _id },
                input,
                { new: true }
            );
        },
        async deleteUser(root, { _id }) {
            return await Users.findOneAndDelete({ _id });
        },

        async createShop(root,{input}){
            return await Shops.create(input)
        },
        async updateShop(root,{_id,input}){
            return await Shops.findOneAndUpdate(
                { _id },
                input,
                { new: true }
            );
        },
        async deleteShop(root, { _id }) {
            return await Shops.findOneAndDelete({ _id });
        }
    }
}

module.exports = {resolvers}