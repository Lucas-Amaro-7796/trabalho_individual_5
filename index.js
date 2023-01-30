import inquirer from 'inquirer'

const cssRules = [];

const addCSSRule = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'selector',
        message: 'Insira o seletor da regra CSS:',
      },
      {
        type: 'input',
        name: 'declaration',
        message: 'Insira a declaração da regra CSS:',
      },
    ])
    .then(answers => {
      const rule = `${answers.selector} { ${answers.declaration} }`;
      if (cssRules.includes(rule)) {
        console.log(`A regra CSS "${rule}" já foi adicionada.`);
        mainMenu();
        return;
      }
      cssRules.push(rule);
      console.log(`Regra CSS adicionada: ${rule}`);
      mainMenu();
    });
};

const removeCSSRule = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'ruleIndex',
        message: 'Selecione a regra CSS a ser removida:',
        choices: cssRules,
      },
    ])
    .then(answers => {
      const ruleIndex = cssRules.indexOf(answers.ruleIndex);
      cssRules.splice(ruleIndex, 1);
      console.log(`Regra CSS removida: ${answers.ruleIndex}`);
      mainMenu();
    });
};

const showCSSRules = () => {
  console.log('Regras CSS:');
  cssRules.forEach(rule => console.log(rule));
  mainMenu();
};

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você gostaria de fazer?',
        choices: ['Adicionar regra CSS', 'Remover regra CSS', 'Exibir regras CSS', 'Sair'],
      },
    ])
    .then(answers => {
      switch (answers.action) {
        case 'Adicionar regra CSS':
          addCSSRule();
          break;
        case 'Remover regra CSS':
          if (cssRules.length) {
            removeCSSRule();
          } else {
            console.log('Não há regras CSS para remover.');
            mainMenu();
          }
          break;
        case 'Exibir regras CSS':
          if (cssRules.length) {
            showCSSRules();
          } else {
            console.log('Não há regras CSS para exibir.');
            mainMenu();
          }
          break;
        case 'Sair':
          console.log('Tchau!');
          process.exit();
      }
    });
};

mainMenu();