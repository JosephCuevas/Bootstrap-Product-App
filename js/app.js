class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body text-left">
                    <div class="card-title">
                        <h5><strong>Product Name</strong>: ${product.name}</h5>
                    </div>
                    <strong>Product Price</strong>: ${product.price}
                    <br>
                    <strong>Product Year</strong>: ${product.year}
                    <br>
                    <a href="#" class="btn btn-danger mt-2" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
        
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            //sube de nivel, toma el elemento, sube al div que tiene encima,
            //vuelve a subir con el siguiente div, toma otra subida de nivel,
            //por ultimo toma al elemento creado y lo elimina

            this.showMessage('Product Deleted Successfully', 'success');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //mostrando en el dom
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

 //DOM EVENTS
 document.getElementById('product-form').addEventListener('submit', function(e) {
     const name = document.getElementById('name').value;
     const price = document.getElementById('price').value;
     const year = document.getElementById('year').value;

     const product = new Product(name, price, year);

    const ui = new UI();
    if(name === '' || price === '' || year === '') {
        return ui.showMessage('Please Complete Fields', 'danger');
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Product Added Successfully', 'success');

    e.preventDefault();
 });

 document.getElementById('product-list').addEventListener('click', function(e) {
     const ui = new UI();
     ui.deleteProduct(e.target);
 });