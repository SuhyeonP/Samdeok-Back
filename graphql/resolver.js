const Users=require('../schemas/user')
const Shops=require('../schemas/shop')
const Reviews=require('../schemas/review')
const Reservations=require('../schemas/reservation')

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
            return await Shops.findOne({masterId:masterId})
        },
        async allReviews(){
            return await Reviews.find()
        },
        async getStoreReviews(inShop){
            const data=await Reviews.find().filter((element)=>element.inShop===String(inShop));
            return data;
        },
        async getUserReviews(writtenBy){
            const data=await Reviews.find().filter((element)=>element.writtenBy===String(writtenBy));
            return data;
        },
        async allReservation(){
            return await Reservations.find()
        },
        async getUserReservation(_,{checkUser}){
            return await Reservations.find({checkUser:checkUser}).filter((element)=>element.checkUser===checkUser)
        },
        async getShopReservation(_,{checkShop}){
            return await Reservations.find({checkShop:checkShop}).filter((element)=>element.checkShop===checkShop)
        },

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
        },

        async createReview(root,{input}){
            return await Reviews.create(input)
        },
        async updateReview(root,{_id,input}){
            return await Reviews.findOneAndUpdate(
                { _id },
                input,
                { new: true }
            );
        },
        async deleteReview(root, { _id }) {
            return await Reviews.findOneAndDelete({ _id });
        },
        async createReservation(root,{input}){
            return await Reviews.create(input)
        },
        async updateReservation(root,{_id,input}){
            return await Reviews.findOneAndUpdate(
                { _id },
                input,
                { new: true }
            );
        },
        async deleteReservation(root, { _id }) {
            return await Reviews.findOneAndDelete({ _id });
        }
    }
}

module.exports = {resolvers}