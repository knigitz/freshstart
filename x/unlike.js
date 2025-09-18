// use in the browser console while on page: https://x.com/<username>/likes
(function loopUnlikeAndScroll() {
  const unlikeButtons = Array.from(document.querySelectorAll('button[data-testid="unlike"]'));
  let index = 0;

  function processNextUnlike() {
    if (index >= unlikeButtons.length) {
      console.log('💤 All visible unlikes processed. Scrolling...');
      window.scrollBy(0, window.innerHeight);
      setTimeout(loopUnlikeAndScroll, 1000);
      return;
    }

    const btn = unlikeButtons[index];
    btn.scrollIntoView({ behavior: "smooth", block: "center" });
    console.log(`💔 Unliking post ${index + 1}/${unlikeButtons.length}`);
    btn.click();

    index++;
    setTimeout(processNextUnlike, 1000); // Wait a bit between clicks
  }

  if (unlikeButtons.length === 0) {
    console.log('✅ No more unlike buttons found.');
    return;
  }

  processNextUnlike();
})();
