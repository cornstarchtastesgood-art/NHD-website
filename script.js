document.addEventListener("DOMContentLoaded", () => {
  const statsBoxes = document.querySelectorAll(".stats-box");

  statsBoxes.forEach(box => {
    const id = box.getAttribute("data-id");
    const visitEl = box.querySelector(".visit-count");
    const upBtn = box.querySelector(".upvote");
    const downBtn = box.querySelector(".downvote");
    const voteCountEl = box.querySelector(".vote-count");

    // --- Visit Counter (per user using localStorage) ---
    let visits = parseInt(localStorage.getItem(`visits-${id}`)) || 0;
    visits++;
    visitEl.textContent = visits;
    localStorage.setItem(`visits-${id}`, visits);

    // --- Vote System ---
    let voteData = JSON.parse(localStorage.getItem(`vote-${id}`)) || { count: 0, choice: null };
    voteCountEl.textContent = voteData.count;
    if (voteData.choice === "up") upBtn.classList.add("active");
    if (voteData.choice === "down") downBtn.classList.add("active");

    // Upvote
    upBtn.addEventListener("click", () => {
      if (voteData.choice === "up") {
        voteData.count--;
        voteData.choice = null;
        upBtn.classList.remove("active");
      } else {
        if (voteData.choice === "down") {
          voteData.count += 2;
          downBtn.classList.remove("active");
        } else {
          voteData.count++;
        }
        voteData.choice = "up";
        upBtn.classList.add("active");
      }
      voteCountEl.textContent = voteData.count;
      localStorage.setItem(`vote-${id}`, JSON.stringify(voteData));
    });

    // Downvote
    downBtn.addEventListener("click", () => {
      if (voteData.choice === "down") {
        voteData.count++;
        voteData.choice = null;
        downBtn.classList.remove("active");
      } else {
        if (voteData.choice === "up") {
          voteData.count -= 2;
          upBtn.classList.remove("active");
        } else {
          voteData.count--;
        }
        voteData.choice = "down";
        downBtn.classList.add("active");
      }
      voteCountEl.textContent = voteData.count;
      localStorage.setItem(`vote-${id}`, JSON.stringify(voteData));
    });
  });
});
