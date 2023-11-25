document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('reminderDate');
    const timeInput = document.getElementById('reminderTime');
    const levelInput = document.getElementById('reminderLevel');
    const setReminderBtn = document.getElementById('setReminder');
    const remindersContainer = document.getElementById('reminders');
    const reminderSound = document.getElementById('reminderSound');
  
    let intervalId;
  
    setReminderBtn.addEventListener('click', function () {
      const reminderDate = dateInput.value;
      const reminderTime = timeInput.value;
      const reminderLevel = levelInput.value;
  
      if (!reminderDate || !reminderTime || !reminderLevel) {
        alert('Please enter valid reminder details.');
        return;
      }
  
      const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
      const now = new Date();
  
      if (reminderDateTime <= now) {
        alert('Please select a future date and time for the reminder.');
        return;
      }
  
      const timeDiff = reminderDateTime - now;
  
      const reminder = document.createElement('div');
      reminder.className = 'reminder';
      reminder.innerHTML = `
        <span>${reminderDate} ${reminderTime}</span>
        <span>Level: ${reminderLevel}</span>
        <button class="delete-reminder">Delete</button>
      `;
  
      const deleteButton = reminder.querySelector('.delete-reminder');
  
      deleteButton.addEventListener('click', function () {
        reminder.remove();
        clearInterval(intervalId);
        reminderSound.pause();
      });
  
      remindersContainer.appendChild(reminder);
  
      dateInput.value = '';
      timeInput.value = '';
      levelInput.value = '';
  
      setTimeout(function () {
        // Show notification
        showNotification('Reminder', `It's time for your reminder: ${reminderLevel}`);
  
        // Play sound
        reminderSound.play();
  
        // Set interval for continuous playing
        intervalId = setInterval(function () {
          // Show notification
          showNotification('Reminder', `It's time for your reminder: ${reminderLevel}`);
  
          // Play sound
          reminderSound.play();
        }, 120000); // Play every 2 minutes (adjust as needed)
      }, timeDiff);
    });
  
    // Function to show a notification
    function showNotification(title, body) {
      if (Notification.permission === 'granted') {
        new Notification(title, { body });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(title, { body });
          }
        });
      }
    }
  });