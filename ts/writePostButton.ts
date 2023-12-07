document.addEventListener('DOMContentLoaded', function() {
  const writePostBtn = document.getElementById('writePostBtn');

  if (writePostBtn) {
    writePostBtn.addEventListener('click', function() {
      window.location.href = '/post/create';
    });
  }
});