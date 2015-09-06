var api = {
    db: "tpspeed",
    collection: "data",
    mongolab: new MongoLab("he64AeI7hj2YzsWMusE37lUx22sU5RzJ"),
    getData: function(callback) {
        this.mongolab.listDocuments(this.db, this.collection, callback);
    }
};