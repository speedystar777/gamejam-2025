let lang = "english"

function convertToSanskrit(num) {
  return Sanscript.t(String(num), 'iast', 'devanagari')
}

var sanskritString = convertToSanskrit('saṃskṛtam')

function setLanguage(newLang) {
  if (lang === newLang) {
    return;
  }
  lang = newLang;
}

function languageSelectionCreate(scene, y = null) {
  scene.eng = scene.add.text(window.innerWidth / 2 - 150, y ?? (window.innerHeight / 2), 'english', { fontSize: 20 }).setInteractive().setOrigin(0.5);
  scene.san = scene.add.text(window.innerWidth / 2 + 150, y ?? (window.innerHeight / 2), sanskritString, { fontSize: 20 }).setInteractive().setOrigin(0.5);

  if (lang === "english") {
    scene.eng.setTint(0xfc49dc);
    scene.san.clearTint();
  } else {
    scene.san.setTint(0xfc49dc);
    scene.eng.clearTint();
  }
}

function languageSelectionUpdate(scene) {
  scene.eng.on('pointerdown', function () {
    setLanguage("english");
    scene.eng.setTint(0xfc49dc);
    scene.san.clearTint();
  }, this);

  scene.san.on('pointerdown', function () {
    setLanguage(sanskritString);
    scene.san.setTint(0xfc49dc);
    scene.eng.clearTint();
  }, this);
}