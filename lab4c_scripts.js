let students = [];

function time_now() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const dateStr = now.toLocaleDateString('en-US', options);

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const timeStr = `${hours}:${minutes} ${ampm}`;

    document.getElementById('dateDisplay').innerText = `Today is ${dateStr}.\nThe current time is ${timeStr}.`;
}

function generateStudentNumber() {
    let number;
    do {
        number = '2023' + Math.floor(10000 + Math.random() * 90000);
    } while (students.find(s => s.studentNumber === number));
    return number;
}

function validateForm(name, age, email) {
    const messageEl = document.getElementById('formMessage');
    if (name.length <= 5 || !name.includes(' ')) {
        messageEl.innerText = 'Name must be more than 5 characters and contain a space.';
        return false;
    }
    if (isNaN(age) || age <= 18 || age >= 99) {
        messageEl.innerText = 'Age must be a number between 19 and 98.';
        return false;
    }
    if (!email.endsWith('@up.edu.ph')) {
        messageEl.innerText = 'Email must end with @up.edu.ph';
        return false;
    }
    messageEl.innerText = '';
    return true;
}

function add_student() {
    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value;

    if (!validateForm(name, age, email)) return;

    const student = {
        studentNumber: generateStudentNumber(),
        name,
        age,
        email,
        course
    };

    students.push(student);
    document.getElementById('formMessage').innerText = 'Student added successfully!';
    document.getElementById('studentForm').reset();
}

function find_student() {
    const searchID = document.getElementById('searchID').value;
    const student = students.find(s => s.studentNumber === searchID);
    const resultEl = document.getElementById('searchResult');

    if (student) {
        resultEl.innerText = `Student Number: ${student.studentNumber}\nName: ${student.name}\nAge: ${student.age}\nEmail: ${student.email}\nCourse: ${student.course}`;
    } else {
        resultEl.innerText = 'Student record does not exist';
    }
}

function display_list() {
    const listEl = document.getElementById('studentList');
    listEl.innerHTML = '';
    if (students.length === 0) {
        listEl.innerText = 'No student records to display.';
        return;
    }
    students.forEach(student => {
        const studentInfo = document.createElement('p');
        studentInfo.innerText = `Student Number: ${student.studentNumber} | Name: ${student.name} | Age: ${student.age} | Email: ${student.email} | Course: ${student.course}`;
        listEl.appendChild(studentInfo);
    });
}
