const Branches = require("../../models/branchesModels");
const branches = require("../../data/branches.json");
const dotenv = require("dotenv");
const path = require('path');
const db = require("../../config/database");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

db();
const seedbranches = async () => {
    try {
        await Branches.deleteMany();
        console.log("Deleted");
        await Branches.insertMany(branches);
        console.log("Inserted");
    } catch (error) {
        console.log(error)
    }
    process.exit();
}

seedbranches();