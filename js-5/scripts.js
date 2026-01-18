const API_URL = 'https://jsonplaceholder.typicode.com/users';
const container = document.getElementById('cards-container');

async function renderUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        
        const html = users.map(user => `
            <div class="card">
                <div class="card-header">
                    <h3>${user.name}</h3>
                    <div class="company-badge">${user.company.name}</div>
                </div>
                <div class="card-body">
                    <div class="info-item">
                        <span class="label">Email:</span>
                        <a href="mailto:${user.email}">${user.email}</a>
                    </div>
                    <div class="info-item">
                        <span class="label">Телефон:</span>
                        <a href="tel:${user.phone}">${user.phone}</a>
                    </div>
                    <div class="info-item">
                        <span class="label">Город:</span>
                        <span>${user.address.city}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Улица:</span>
                        <span>${user.address.street}</span>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

renderUsers();