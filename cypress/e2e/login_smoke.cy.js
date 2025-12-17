import loginPage from '../pages/LoginPage';


describe('Somke test - Login SauceDemo', () => {

    beforeEach(() => {
       loginPage.visit();
    });

    it('Login exitoso', () => {
        cy.fixture('users').then((users) => {
            loginPage.login(
                users.validUser.username,
                users.validUser.password
            );
            cy.url().should('include', '/inventory.html');
        });
    });

    it('Login fallido con contraseña incorrecta', () => {
        cy.fixture('users').then((users) => {
            loginPage.login(
                users.invalidUser.username,
                users.invalidUser.password
            )
            loginPage.elements.errorMessage().should('be.visible');
        })
    })

    it('Validacion campos vacios', () => {
        loginPage.clickLogin();

        loginPage.elements.errorMessage().should('be.visible').and('contain', 'Username is required');
    })

    it('Validacion campo password vacio', () => {
        cy.fixture('users').then((users) =>{
            loginPage.typeUsername(users.validUser.username);
            loginPage.clickLogin();
            
            loginPage.elements.errorMessage().should('be.visible').and('contain', 'Password is required');
        })
    })

});