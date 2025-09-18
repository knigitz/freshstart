// use in the browser console while on page: https://x.com/<username>/with_replies
(function loopDeleteAndScroll() {
  const menuButtons = Array.from(document.querySelectorAll('button[aria-haspopup="menu"][aria-expanded="false"]'));
  let index = 0;

  function processNextMenu() {
    if (index >= menuButtons.length) {
      console.log('📜 All menus processed. Scrolling...');
      window.scrollBy(0, window.innerHeight);
      setTimeout(loopDeleteAndScroll, 1000);
      return;
    }

    const btn = menuButtons[index];
    btn.click(); // Open menu
    console.log(`🔽 Opened menu ${index + 1}/${menuButtons.length}`);

    setTimeout(() => {
      const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
      const deleteItem = menuItems.find(el =>
        /delete/i.test(el.textContent) ||
        (el.getAttribute('aria-label') || '').toLowerCase().includes('delete')
      );

      if (deleteItem) {
        console.log('🗑️ Clicking delete menuitem:', deleteItem);
        deleteItem.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to delete button
        deleteItem.click();

        // Confirm deletion
        setTimeout(() => {
          const confirmButton = document.querySelector('[data-testid="confirmationSheetConfirm"]');

          if (confirmButton) {
            console.log('✅ Confirming deletion:', confirmButton);
            confirmButton.click();
          } else {
            console.log('⚠️ No confirm button found');
          }

          index++;
          setTimeout(processNextMenu, 500);
        }, 500); // Wait for modal to render
      } else {
        btn.click(); // Close menu
        console.log('❌ No delete menuitem found, closed menu');
        index++;
        setTimeout(processNextMenu, 50);
      }
    }, 200); // Wait for menu to render
  }

  processNextMenu();
})();
