// Switch Pages
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// ---------------- MARKSHEET LOGIC ----------------

let subjects = [];

function addSubject() {
    const name = document.getElementById("subjectName").value;
    const marks = Number(document.getElementById("marksObtained").value);
    const max = Number(document.getElementById("maxMarks").value);

    if (name === "" || marks === "" || max === "" || marks > max) {
        alert("Enter valid subject details!");
        return;
    }

    subjects.push({ name, marks, max });
    updateMarksheet();
}

function updateMarksheet() {
    const tbody = document.getElementById("subjectsTableBody");
    tbody.innerHTML = "";

    let totalMarks = 0, totalMax = 0;

    subjects.forEach((sub, index) => {
        const percent = ((sub.marks / sub.max) * 100).toFixed(2);

        tbody.innerHTML += `
            <tr>
                <td>${sub.name}</td>
                <td>${sub.marks}</td>
                <td>${sub.max}</td>
                <td>${percent}%</td>
                <td class="no-print">
                    <button class="btn-delete" onclick="deleteSubject(${index})">Delete</button>
                </td>
            </tr>
        `;

        totalMarks += sub.marks;
        totalMax += sub.max;
    });

    document.getElementById("marksheetEmpty").style.display = subjects.length ? "none" : "block";
    document.getElementById("marksheetTable").style.display = subjects.length ? "block" : "none";

    const percentage = ((totalMarks / totalMax) * 100).toFixed(2);
    let grade = "-";

    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else grade = "D";

    document.getElementById("totalMarks").textContent = `${totalMarks} / ${totalMax}`;
    document.getElementById("percentage").textContent = `${percentage}%`;
    document.getElementById("grade").textContent = grade;
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    updateMarksheet();
}

function clearMarksheet() {
    subjects = [];
    updateMarksheet();
}

// ---------------- EMPLOYEE LOGIC ----------------

let employees = [];

function addEmployee() {
    const name = document.getElementById("empName").value;
    const id = document.getElementById("empId").value;
    const basic = Number(document.getElementById("basicSalary").value);

    if (!name || !id || !basic) {
        alert("Enter valid employee details");
        return;
    }

    const hra = basic * 0.20;
    const da = basic * 0.15;
    const ta = basic * 0.10;
    const total = basic + hra + da + ta;

    employees.push({ name, id, basic, hra, da, ta, total });
    updateEmployeeTable();
}

function updateEmployeeTable() {
    const tbody = document.getElementById("employeeTableBody");
    tbody.innerHTML = "";

    employees.forEach((emp, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.id}</td>
                <td>${emp.basic}</td>
                <td>${emp.hra}</td>
                <td>${emp.da}</td>
                <td>${emp.ta}</td>
                <td>${emp.total}</td>
                <td class="no-print">
                    <button class="btn-delete" onclick="deleteEmployee(${i})">Delete</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("employeeEmpty").style.display = employees.length ? "none" : "block";
    document.getElementById("employeeTable").style.display = employees.length ? "block" : "none";
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    updateEmployeeTable();
}
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});
