'use strict';

const initialProducts = [
  {
    name: 'Laptop',
    quantity: 10,
    price: 800,
    vendor: 'Dell',
    category: 'Electronics',
  },
  {
    name: 'Phone',
    quantity: 25,
    price: 500,
    vendor: 'Samsung',
    category: 'Electronics',
  },
  {
    name: 'Desk Chair',
    quantity: 15,
    price: 150,
    vendor: 'Ikea',
    category: 'Furniture',
  },
];

let products = [...initialProducts];
let editIndex = null;


const productId = document.getElementById('productId');
const productName = document.getElementById('productName');
const productQuantity = document.getElementById('productQuantity');
const productPrice = document.getElementById('productPrice');
const productVendor = document.getElementById('productVendor');
const productCategory = document.getElementById('productCategory');

function getNameCell(name) {
  const nameCell = document.createElement('td');
  nameCell.className = 'py-2 px-4 border-b text-center';
  nameCell.textContent = name;
  return nameCell;
}

function getQuantityCell(quantity) {
  const quantityCell = document.createElement('td');
  quantityCell.className = 'py-2 px-4 border-b text-center';
  quantityCell.textContent = quantity;
  return quantityCell;
}

function getPriceCell(price) {
  const priceCell = document.createElement('td');
  priceCell.className = 'py-2 px-4 border-b text-center';
  priceCell.textContent = price;
  return priceCell;
}

function getVendorCell(vendor) {
  const vendorCell = document.createElement('td');
  vendorCell.className = 'py-2 px-4 border-b text-center';
  vendorCell.textContent = vendor;
  return vendorCell;
}

function getCategoryCell(category) {
  const categoryCell = document.createElement('td');
  categoryCell.className = 'py-2 px-4 border-b text-center';
  categoryCell.textContent = category;
  return categoryCell;
}

function getActionsCell(product) {
  const actionsCell = document.createElement('td');
  actionsCell.className = 'py-2 px-4 border-b text-center';

  const editButton = document.createElement('button');
  editButton.className = 'bg-green-500 hover:bg-green-800 m-1 text-white px-2 py-1 rounded edit-btn';
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function () {
    editProducts(product);
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded delete-btn';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    deleteProduct(product);
  });

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);

  return actionsCell;
}

function renderProducts() {
  productTableBody.innerHTML = '';
  products.forEach(function (product) {
    const row = document.createElement('tr');

    const nameCell = getNameCell(product.name);
    row.appendChild(nameCell);

    const quantityCell = getQuantityCell(product.quantity);
    row.appendChild(quantityCell);

    const priceCell = getPriceCell(product.price)
    row.appendChild(priceCell);

    const vendorCell = getVendorCell(product.vendor)
    row.appendChild(vendorCell);

    const categoryCell = getCategoryCell(product.category)
    row.appendChild(categoryCell);

    const actionsCell = getActionsCell(product)
    row.appendChild(actionsCell);

    productTableBody.appendChild(row);
  });
}

function deleteProduct(product) {
  const index = products.findIndex(p => p.name === product.name && p.vendor === product.vendor);
  if (index !== -1) {
    products.splice(index, 1);
    renderProducts();
  }
}

function editProducts(product) {
  const index = products.findIndex(p => p.name === product.name && p.vendor === product.vendor);
  if (index !== -1) {
    productId.value = index;
    productName.value = product.name;
    productQuantity.value = product.quantity;
    productPrice.value = product.price;
    productVendor.value = product.vendor;
    productCategory.value = product.category;
    editIndex = index;
  }
}

function highlightEmptyFields(fields) {
  fields.forEach(field => {
    if (!field.value) {
      field.classList.add('border-red-500', 'jump');
      
    } else {
      field.classList.remove('border-red-500');
    }
  });
}

productForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  const fields = [productName, productQuantity, productPrice, productVendor, productCategory];
  highlightEmptyFields(fields);

  const name = productName.value;
    const quantity = parseInt(productQuantity.value, 10);
    const price = parseFloat(productPrice.value);
    const vendor = productVendor.value;
    const category = productCategory.value;

  if (name && !isNaN(quantity) && !isNaN(price) && vendor && category) {
    var newProduct = { name: name, quantity: quantity, price: price, vendor: vendor, category: category };

    if (editIndex !== null) {
      var index = products.findIndex((product) => product.name === products[editIndex].name && product.vendor === products[editIndex].vendor);
      if (index !== -1) {
        products.splice(index, 1, newProduct);
        editIndex = null;
      }
    } else {
      products.push(newProduct);
    }

    productForm.reset();
    renderProducts(); 
  }
});

renderProducts();

