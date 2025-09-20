function launchConfetti(element) {
  party.confetti(element, {
    count: party.variation.range(30, 50),
    spread: 90,
    speed: 400,
    colors: ["#00ffff", "#ffffff"]
  });
}