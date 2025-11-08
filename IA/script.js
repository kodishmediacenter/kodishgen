// Lista padrão de IAs
const LINKS_PADRAO = [
    {"name": "ChatGPT", "url": "https://chat.openai.com"},
    {"name": "Claude", "url": "https://claude.ai"},
    {"name": "Gemini", "url": "https://gemini.google.com"},
    {"name": "Perplexity", "url": "https://www.perplexity.ai"},
    {"name": "Pi", "url": "https://pi.ai"},
    {"name": "HuggingChat", "url": "https://huggingface.co/chat"},
    {"name": "Copilot", "url": "https://copilot.microsoft.com"},
    {"name": "Reka", "url": "https://reka.ai"},
    {"name": "ChatSonic", "url": "https://writesonic.com/chat"},
    {"name": "YouChat", "url": "https://you.com"},
    {"name": "Phind", "url": "https://www.phind.com"},
    {"name": "Blackbox AI", "url": "https://www.blackbox.ai"},
    {"name": "DeepSeek", "url": "https://www.deepseek.com"},
    {"name": "Grok", "url": "https://x.ai"},
    {"name": "Mistral", "url": "https://chat.mistral.ai"},
    {"name": "Meta AI", "url": "https://www.meta.ai"},
    {"name": "Janitor AI", "url": "https://janitorai.com"},
    {"name": "Character.AI", "url": "https://beta.character.ai"},
    {"name": "Venice AI", "url": "https://venice.ai"},
    {"name": "Ora AI", "url": "https://ora.ai"},
    {"name": "Kobold AI", "url": "https://koboldai.org"},
    {"name": "OpenAssistant", "url": "https://open-assistant.io"},
    {"name": "Suno AI", "url": "https://suno.ai"},
    {"name": "Udio", "url": "https://www.udio.com"},
    {"name": "ElevenLabs", "url": "https://elevenlabs.io"},
    {"name": "Leonardo AI", "url": "https://leonardo.ai"},
    {"name": "Pika Labs", "url": "https://pika.art"},
    {"name": "Runway", "url": "https://runwayml.com"}
];

class IANavigator {
    constructor() {
        this.links = [];
        this.selectedItem = null;
        this.filteredLinks = [];
        this.init();
    }

    init() {
        this.loadLinks();
        this.bindEvents();
        this.renderList();
    }

    loadLinks() {
        const saved = localStorage.getItem('ia_links');
        if (saved) {
            this.links = JSON.parse(saved);
        } else {
            this.links = LINKS_PADRAO.slice();
            this.saveLinks();
        }
        this.filteredLinks = this.links;
    }

    saveLinks() {
        localStorage.setItem('ia_links', JSON.stringify(this.links));
    }

    bindEvents() {
        // Botões principais
        document.getElementById('openBtn').addEventListener('click', () => this.openLink());
        document.getElementById('addBtn').addEventListener('click', () => this.showAddModal());
        document.getElementById('removeBtn').addEventListener('click', () => this.removeLink());

        // Modal
        document.querySelector('.close').addEventListener('click', () => this.hideAddModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.hideAddModal());
        document.getElementById('saveBtn').addEventListener('click', () => this.addLink());

        // Fechar modal clicando fora
        document.getElementById('addModal').addEventListener('click', (e) => {
            if (e.target.id === 'addModal') this.hideAddModal();
        });

        // Busca
        document.getElementById('searchInput').addEventListener('input', (e) => this.filterList(e.target.value));

        // Seleção por duplo clique
        document.getElementById('iaList').addEventListener('dblclick', (e) => {
            if (e.target.closest('.ia-item')) {
                this.openLink();
            }
        });
    }

    renderList() {
        const list = document.getElementById('iaList');
        list.innerHTML = '';

        this.filteredLinks.forEach(link => {
            const li = document.createElement('li');
            li.className = 'ia-item';
            if (this.selectedItem === link.name) {
                li.classList.add('selected');
            }
            
            li.innerHTML = `
                <span class="ia-name">${link.name}</span>
                <span class="ia-url">${link.url}</span>
            `;

            li.addEventListener('click', () => this.selectItem(link.name));
            list.appendChild(li);
        });

        document.getElementById('totalCount').textContent = `Total de IAs: ${this.links.length}`;
        this.updateButtons();
    }

    selectItem(name) {
        this.selectedItem = name;
        this.renderList();
    }

    updateButtons() {
        const hasSelection = this.selectedItem !== null;
        document.getElementById('openBtn').disabled = !hasSelection;
        document.getElementById('removeBtn').disabled = !hasSelection;
    }

    filterList(searchTerm) {
        if (!searchTerm) {
            this.filteredLinks = this.links;
        } else {
            const term = searchTerm.toLowerCase();
            this.filteredLinks = this.links.filter(link => 
                link.name.toLowerCase().includes(term) || 
                link.url.toLowerCase().includes(term)
            );
        }
        this.selectedItem = null;
        this.renderList();
    }

    openLink() {
        if (!this.selectedItem) return;

        const link = this.links.find(l => l.name === this.selectedItem);
        if (link) {
            window.open(link.url, '_blank');
        }
    }

    showAddModal() {
        document.getElementById('addModal').style.display = 'block';
        document.getElementById('iaName').value = '';
        document.getElementById('iaUrl').value = '';
        document.getElementById('iaName').focus();
    }

    hideAddModal() {
        document.getElementById('addModal').style.display = 'none';
    }

    addLink() {
        const name = document.getElementById('iaName').value.trim();
        const url = document.getElementById('iaUrl').value.trim();

        if (!name) {
            alert('Por favor, insira um nome para a IA.');
            return;
        }

        if (!url || !url.startsWith('http')) {
            alert('Por favor, insira uma URL válida (deve começar com http:// ou https://).');
            return;
        }

        // Verificar se já existe
        if (this.links.some(link => link.name.toLowerCase() === name.toLowerCase())) {
            alert('Essa IA já existe na lista.');
            return;
        }

        const newLink = { name, url };
        this.links.push(newLink);
        this.saveLinks();
        this.filteredLinks = this.links;
        this.selectedItem = null;
        this.renderList();
        this.hideAddModal();

        // Mostrar mensagem de sucesso
        alert(`IA "${name}" adicionada com sucesso!`);
    }

    removeLink() {
        if (!this.selectedItem) return;

        if (confirm(`Tem certeza que deseja remover "${this.selectedItem}" da lista?`)) {
            this.links = this.links.filter(link => link.name !== this.selectedItem);
            this.saveLinks();
            this.filteredLinks = this.links;
            this.selectedItem = null;
            this.renderList();
            alert('IA removida com sucesso!');
        }
    }
}

// Inicializar a aplicação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new IANavigator();
});