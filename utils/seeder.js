const mongoDBConnection = require('./database');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

mongoDBConnection.then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log('An error ocurred while connecting to db.', err);
});

require('../models/index');
const Pet = mongoose.model('Pet');
const Owner = mongoose.model('Owner');
const Product = mongoose.model('Product');

const genders = ['male', 'female'];
const type = ['cat','dog','bird'];
const petStatus = ['alive', 'deceased'];
 
async function runSeeder() {
    // Clean database
    await Pet.deleteMany();
    await Owner.deleteMany();
    await Product.deleteMany();


    console.log('CREATING 10 OWNERS....\n');
    // 10 Owners
    for (let i = 0; i < 10; i++) {
        const newUserData = {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            phone: faker.phone.phoneNumberFormat()
        }

        try {
            const fakeOwner = await Owner.create(newUserData);
            console.log(fakeOwner);
        } catch (error) {
            console.log('something ocurred');
        }
    }

    // Get all Owners to use their id;
    const allOwners = await Owner.find();

    console.log('CREATING 10 PETS WITH OWNER....\n');
    // 10 pets, with its owner
    for (let i = 0; i < 10; i++) {
        const randomGender = genders[Math.floor(Math.random() * genders.length)];
        const randomType = type[Math.floor(Math.random() * type.length)];
        const randomStatus = petStatus[Math.floor(Math.random() * petStatus.length)];
        const randomOwnerIndex = faker.datatype.number({ min: 0, max: 9 });
        let species;
    
        switch(randomType) {
            case 'cat':
                species = faker.animal.cat();
                break;
            case 'dog':
                species = faker.animal.dog();
                break;
            case 'bird':
                species = faker.animal.bird();
                break;
        }
    
        const newPetData = {
            name: faker.name.firstName(randomGender),
            birth_date: faker.date.between('01/01/2010', new Date()).toLocaleDateString('mx'),
            weight: faker.datatype.number({ min: 1, max: 50, precision: 0.01 }),
            type: randomType,
            species,
            status: randomStatus,
            gender: randomGender,
            owner: allOwners[randomOwnerIndex]._id // Owner Id
        };

        try {
            // Create new pet
            const newPet = await Pet.create(newPetData);

            console.log(newPet);
            // Add pet id to owner's pets array
            allOwners[randomOwnerIndex].pets.push(newPet);
            await allOwners[randomOwnerIndex].save();
        } catch (error) {
            console.log('something ocurred');
        }
    }


    console.log('CREATING 10 PRODUCTS....');
    // 10 products
    for (let i = 0; i < 10; i++) {
        let newProductData = {
            name: faker.commerce.product(),
            price: faker.commerce.price(10, 20000),
            brand: faker.random.word()
        }

        if (i%2 === 0) {
            newProductData.description =  faker.commerce.productDescription();
        }
        
        try {
            const newProduct = await Product.create(newProductData);

            console.log(newProduct);
        } catch (error) {
            console.log('something ocurred');
        }
    }

    process.exit();
}

runSeeder();