document.addEventListener('DOMContentLoaded', () => {
    const studentList = document.getElementById('student-list');
    const studentModal = new bootstrap.Modal(document.getElementById('studentModal'), {});
    const studentForm = document.getElementById('student-form');
    const saveStudentButton = document.getElementById('save-student');
    const addStudentButton = document.getElementById('add-student-button');
  
    // Function to reset the form
    const resetForm = () => {
      studentForm.reset();
      document.getElementById('studentModalLabel').textContent = 'Add Student';
    };
  
    // Click handler for Add Student button
    addStudentButton.addEventListener('click', () => {
      resetForm();
    });
  
    // Click handler for Edit Student button
    studentList.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit-student')) {
        const studentId = event.target.getAttribute('data-id');
        const studentRow = event.target.closest('tr');
        const studentName = studentRow.querySelector('td:nth-child(1)').textContent.trim();
        const studentSubject = studentRow.querySelector('td:nth-child(2)').textContent.trim();
        const studentMarks = studentRow.querySelector('td:nth-child(3)').textContent.trim();
        // Populate modal with student data
        document.getElementById('student-id').value = studentId;
        document.getElementById('student-name').value = studentName;
        document.getElementById('student-subject').value = studentSubject;
        document.getElementById('student-marks').value = studentMarks;
  
        // Update modal title
        document.getElementById('studentModalLabel').textContent = 'Edit Student';
  
        // Show the modal
        studentModal.show();
      }
    });

    document.querySelectorAll('.edit-student').forEach(button => {
      button.addEventListener('click', (event) => {
        const studentId = event.target.dataset.id;
        const form = document.getElementById('student-form');
        $("#student-form").append('<input type="hidden" id="student-id" name="student[id]" value="'+studentId+'" />');
        // Fetch student data
        fetch(`/students/${studentId}/edit`)
          .then(response => response.json())
          .then(data => {
            // Populate the form fields with the existing data
            form.action = `/students/${studentId}`;
            form.querySelector('#student-name').value = data.name;
            form.querySelector('#student-subject').value = data.subject;
            form.querySelector('#student-marks').value = data.marks;
  
            // Show the modal after populating the data
            studentModal.show();
          })
          .catch(error => console.error('Error fetching student data:', error));
      });
    });
  
    // Click handler for Save button
    saveStudentButton.addEventListener('click', () => {
      const studentId = document.getElementById('student-id').value;
      const studentName = document.getElementById('student-name').value;
      const studentSubject = document.getElementById('student-subject').value;
      const studentMarks = document.getElementById('student-marks').value;
  
      const method = studentId ? 'PUT' : 'POST';
      const url = studentId ? `/students/${studentId}` : '/students';
  
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
          student: {
            name: studentName,
            subject: studentSubject,
            marks: studentMarks
          }
        })
      })
      .then(response => response.json())
      .then(data => {
        if (studentId) {
          // Update the table row with the new data
          const studentRow = studentList.querySelector(`tr[data-id="${studentId}"]`);
          studentRow.querySelector('td:nth-child(1)').textContent = data.name;
          studentRow.querySelector('td:nth-child(2)').textContent = data.subject;
          studentRow.querySelector('td:nth-child(3)').textContent = data.marks;
          showMessage('Student updated successfully!', 'success');
        } else {
          // Append the new student to the table
          const newRow = document.createElement('tr');
          newRow.setAttribute('data-id', data.id);
          newRow.innerHTML = `
            <td>${data.name}</td>
            <td>${data.subject}</td>
            <td>${data.marks}</td>
            <td>
              <button class="btn btn-info btn-sm edit-student" data-bs-toggle="modal" data-bs-target="#studentModal" data-id="${data.id}">Edit</button>
              <button class="btn btn-danger btn-sm delete-student">Delete</button>
            </td>
          `;
          studentList.appendChild(newRow);
          showMessage('Student added successfully!', 'success');
        }
        location.reload();
        // Hide the modal
        studentModal.hide();
      })
      .catch(error => console.error('Error:', error));
    });
  
    // Click handler for Delete Student button
    studentList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-student')) {
        const studentId = event.target.closest('tr').getAttribute('data-id');
        fetch(`/students/${studentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
          }
        })
        .then(() => {
          const studentRow = studentList.querySelector(`tr[data-id="${studentId}"]`);
          studentRow.remove();
          showMessage('Student deleted successfully!', 'success');
        })
        .catch(error => console.error('Error:', error));
        showMessage('Failed to delete the student. Please try again.', 'danger');
      }
    });
  });
  