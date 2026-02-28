const loadoutData = {
    primaryWeapon: primaryWeapons,
    secondaryWeapon: secondaryWeapons,
    gadget: gadgets
  };

  const defaultImage = 'Empty.png';

  function fillLoadoutSelects(selectType) {
    document.querySelectorAll(selectType).forEach(select => {
      const type = select.dataset.type;
      const dataToDisplay = loadoutData[type];
      if (!dataToDisplay) return;
      select.innerHTML = '';
      const emptyOption = new Option('------', '');
      emptyOption.classList.add('option-empty'); // nowa klasa
      select.appendChild(emptyOption);
      Object.entries(dataToDisplay).forEach(([mainCategory, subGroups]) => {
        const mainOption = document.createElement('option');
        mainOption.textContent = mainCategory;
        mainOption.disabled = true;
        mainOption.classList.add('option-main');
        select.appendChild(mainOption);
        Object.entries(subGroups).forEach(([subGroup, weapons]) => {
          const subOption = document.createElement('option');
          subOption.textContent = subGroup;
          subOption.disabled = true;
          subOption.classList.add('option-sub');
          select.appendChild(subOption);
          weapons.forEach(weapon => {
            const opt = document.createElement('option');
            opt.textContent = weapon.name;
            opt.value = weapon.value;
            opt.classList.add('option-weapon');
            select.appendChild(opt);
          });
        });
      });
      if (selectType === 'select.category-select'){
        select.addEventListener('change', () => {
          const chosen = select.value;
          if (!chosen) return;
          const slots = document.querySelectorAll(`.section-triple select.weapon-select[data-type="${type}"]`);
          for (const slotSelect of slots) {
            const img = slotSelect.nextElementSibling;
           if (!img.getAttribute("src") || img.getAttribute("src").endsWith('Empty.png')) {
              slotSelect.value = chosen;
              img.src = chosen;
              break;
            }
          }
          select.value = ''; // zresetuj select
          select.style.display = 'none'; // schowaj po wyborze
        }); 
      }
      else if (selectType === 'select.weapon-select') {
        select.addEventListener('change', () => {
          const img = select.nextElementSibling;
          if (img) {
            img.src = select.value || defaultImage;
          }
        });
      }
    });
  }
  fillLoadoutSelects('select.weapon-select');
  fillLoadoutSelects('select.category-select');

  function toggleSelect(clickPoint, relation) {
    document.querySelectorAll(clickPoint).forEach(element => {
      element.addEventListener('click', () => {
        const select = element[relation];
        if (select && select.tagName === 'SELECT') {
          const currentDisplay = window.getComputedStyle(select).display;
          select.style.display = (currentDisplay === 'none') ? 'block' : 'none';
        }
      });
    });
  }
  toggleSelect("h2.title-loadout", "nextElementSibling");
  toggleSelect(".loadout", "previousElementSibling");
