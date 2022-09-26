const mongoDBConnection = require('./database');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

mongoDBConnection.then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log('An error ocurred while connecting to db.', err);
});

require('../models/index');
const Student = mongoose.model('Student');
const Course = mongoose.model('Course');
const Teacher = mongoose.model('Teacher');

const genders = ['male', 'female'];
 
async function runSeeder() {
    // Clean database
    await Student.deleteMany();
    await Course.deleteMany();
    await Teacher.deleteMany();


    console.log('CREATING 10 Courses....\n');
    // 10 Owners
    for (let i = 0; i < 10; i++) {
        const newCourseData = {
            title: faker.random.words(2)
        };

        try {
            const fakeCourse = await Course.create(newCourseData);
            console.log(fakeCourse);
        } catch (error) {
            console.log('something ocurred');
        }
    }

    // Get all Owners to use their id;
    const allCourses = await Course.find();

    console.log('CREATING 10 STUDENTS WITH COURSES....\n');
    // 10 students with 2 courses
    for (let i = 0; i < 10; i++) {
        const randomGender = genders[Math.floor(Math.random() * genders.length)];
        const randomCourseIndex = faker.datatype.number({ min: 0, max: 9 });
        let randomCourseIndex2 = faker.datatype.number({ min: 0, max: 9 });

        /** Do random again if repeated course */
        while (randomCourseIndex2 == randomCourseIndex) {
            randomCourseIndex2 = faker.datatype.number({ min: 0, max: 9 });
        } 
    
        const newStudentData = {
            first_name: faker.name.firstName(randomGender),
            last_name: faker.name.lastName(),
            birth_date: faker.date.between('01/01/1990', '01/01/2004').toLocaleDateString('mx'),
            courses: [
                allCourses[randomCourseIndex]._id, // Course 1 Id
                allCourses[randomCourseIndex2]._id // Course 2 Id
            ]
        };

        newStudentData.email = faker.internet.email(newStudentData.first_name, newStudentData.last_name);

        try {
            // Create new student
            const newStudent = await Student.create(newStudentData);

            console.log(newStudent);
            // Add student id to course's students array
            allCourses[randomCourseIndex].students.push(newStudent);
            allCourses[randomCourseIndex2].students.push(newStudent);
            await allCourses[randomCourseIndex].save();
            await allCourses[randomCourseIndex2].save();
        } catch (error) {
            console.log(error);
        }
    }


    console.log('CREATING 10 TEACHERS....');
    // 10 teachers with 1 course
    for (let i = 0; i < 10; i++) {
        const randomGender = genders[Math.floor(Math.random() * genders.length)];
        const randomCourseIndex = faker.datatype.number({ min: 0, max: 9 });

        let newTeacherData = {
            first_name: faker.name.firstName(randomGender),
            last_name: faker.name.lastName(),
            birth_date: faker.date.between('01/01/1955', '01/01/1996').toLocaleDateString('mx'),
            courses: [
                allCourses[randomCourseIndex]._id
            ]
        };

        newTeacherData.email = faker.internet.email(newTeacherData.first_name, newTeacherData.last_name);

        try {
            const newTeacher = await Teacher.create(newTeacherData);

            console.log(newTeacher);

            // Add teacher id to course
            allCourses[randomCourseIndex].teacher = newTeacher;
            await allCourses[randomCourseIndex].save();
        } catch (error) {
            console.log('something ocurred');
        }
    }

    process.exit();
}

runSeeder();