// use in the browser console while on pages:
// https://old.reddit.com/user/<username>/
// https://old.reddit.com/user/<username>/comments/
javascript:(function() {
  let interval = setInterval(() => {
    let deleteButtons = document.querySelectorAll('a[data-event-action="delete"]');
    if (deleteButtons.length === 0) {
      clearInterval(interval);
      let nextButton = document.querySelector('.next-button > a');
      if (nextButton) {
        console.log('📄 No more delete buttons. Moving to next page...');
        nextButton.click();
        alert('📄 Page changed. Restart the script.');
      } else {
        console.log('✅ All items processed. No next page found.');
      }
    } else {
      console.log(`🗑️ Deleting item (${deleteButtons.length} left)...`);
      deleteButtons[0].click();
      setTimeout(() => {
        let confirmButton = document.querySelector('span.option.error.active > a.yes');
        if (confirmButton) {
          console.log('✅ Confirming deletion...');
          confirmButton.click();
        } else {
          console.log('⚠️ Confirm button not found.');
        }
      }, 300);
    }
  }, 1000);
})();
