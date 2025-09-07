  //ICON
  const operatorIcon = document.getElementById('operatorIcon');
  const fileInput = document.getElementById('fileInput');
  operatorIcon.addEventListener('click', () => {
     fileInput.click();
  });
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        operatorIcon.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // CODENAME
  document.addEventListener('DOMContentLoaded', () => {
    const codenameSpan = document.getElementById('codename');
    codenameSpan.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = codenameSpan.textContent;
      input.id = 'codename-input';
      codenameSpan.replaceWith(input);
      input.focus();
      function save() {
        if (input.value.trim() === '') {
          input.value = 'CODENAME';
        }
        codenameSpan.textContent = input.value.trim();
        input.replaceWith(codenameSpan);
      }
      input.addEventListener('blur', save);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          save();
        }
        if (e.key === 'Escape') {
          input.replaceWith(codenameSpan);
        }
      });
    });
  });

  // SIDE
  const sideLabel = document.getElementById('side-label');
  const sideImage = document.getElementById('side-image');
  const sideText = document.getElementById('side-text');
  let currentSide = 'ATTACKER';
  sideLabel.addEventListener('click', () => {
    if (currentSide === 'ATTACKER') {
      currentSide = 'DEFENDER';
      sideImage.src = 'Images/sideDefender.png';
      sideText.textContent = 'DEFENDER';
    } else {
      currentSide = 'ATTACKER';
      sideImage.src = 'Images/sideAttacker.png';
      sideText.textContent = 'ATTACKER';
    }
  });

  // SQUAD
  const squadLabel = document.getElementById('squad-label');
  const squadSelect = document.getElementById('squad-select');
  const squadImage = document.getElementById('squad-image');
  const squadText = document.getElementById('squad-text');
  let currentSquad = '';
  function setSquad(option) {
    const imgPath = option.getAttribute('data-img');
    const squadName = option.value;
    if (imgPath) {
      squadImage.src = imgPath;
      squadImage.style.display = 'inline';
      squadText.textContent = squadName;
      currentSquad = squadName;
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const defaultOption = squadSelect.options[squadSelect.selectedIndex];
    setSquad(defaultOption);
  });
  squadLabel.addEventListener('click', () => {
    if (squadSelect.style.display === 'none' || squadSelect.style.display === '') {
      squadSelect.style.display = 'inline';
    } else {
      squadSelect.style.display = 'none';
    }
  });
  squadSelect.addEventListener('input', () => {
    setSquad(squadSelect.options[squadSelect.selectedIndex]);
    squadSelect.style.display = 'none';
  });

  // SPECIALTY
  const specialtyLabel = document.getElementById('specialty-label');
  const specialtyOptions = document.getElementById('specialty-options');
  const specialtyOutput = document.getElementById('specialty-output');
  specialtyLabel.addEventListener('click', () => {
    specialtyOptions.style.display =
      specialtyOptions.style.display === 'none' ? 'block' : 'none';
  });
  specialtyOptions.addEventListener('change', () => {
    const checkboxes = specialtyOptions.querySelectorAll('input[type="checkbox"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked);
    const selectedValues = checked.map(cb => cb.value);
    specialtyOutput.textContent = selectedValues.join(', ');
  });

  // HEALTH SPEED
  const healthLabel = document.getElementById('health-label');
  const speedLabel = document.getElementById('speed-label');
  const healthImage = document.getElementById('health-image');
  const speedImage = document.getElementById('speed-image');
  const healthspeedstates = [
    ['healthspeedPoints3.png', 'healthspeedPoints1.png'],
    ['healthspeedPoints2.png', 'healthspeedPoints2.png'],
    ['healthspeedPoints1.png', 'healthspeedPoints3.png']
  ];
  let currentState = 1;
  function updateImages() {
    healthImage.src = 'Images/' + healthspeedstates[currentState][0];
    speedImage.src = 'Images/' + healthspeedstates[currentState][1];
  }
  healthLabel.addEventListener('click', () => {
    currentState = (currentState - 1 + healthspeedstates.length) % healthspeedstates.length;
    updateImages();
  });
  speedLabel.addEventListener('click', () => {
    currentState = (currentState + 1) % healthspeedstates.length;
    updateImages();
  });
  updateImages();
