const fs = require('fs');

// Function to update contracts.json file
function updateContractsJson(updatedContract) {
    fs.readFile('contracts.json', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading contracts.json file:', error);
            return;
        }

        const contracts = JSON.parse(data);
        const index = contracts.findIndex(contract => contract.id === updatedContract.id);

        if (index !== -1) {
            contracts[index] = updatedContract;
        }

        fs.writeFile('contracts.json', JSON.stringify(contracts, null, 2), 'utf8', error => {
            if (error) {
                console.error('Error updating contracts.json file:', error);
            } else {
                console.log('contracts.json file updated successfully.');
            }
        });
    });
}

// Function to update customers.json file
function updateCustomersJson(updatedCustomer) {
    fs.readFile('customers.json', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading customers.json file:', error);
            return;
        }

        const customers = JSON.parse(data);
        const index = customers.findIndex(customer => customer.id === updatedCustomer.id);

        if (index !== -1) {
            customers[index] = updatedCustomer;
        }

        fs.writeFile('customers.json', JSON.stringify(customers, null, 2), 'utf8', error => {
            if (error) {
                console.error('Error updating customers.json file:', error);
            } else {
                console.log('customers.json file updated successfully.');
            }
        });
    });
}

// Function to update vehicles.json file
function updateVehiclesJson(updatedVehicle) {
    fs.readFile('vehicles.json', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading vehicles.json file:', error);
            return;
        }

        const vehicles = JSON.parse(data);
        const index = vehicles.findIndex(vehicle => vehicle.id === updatedVehicle.id);

        if (index !== -1) {
            vehicles[index] = updatedVehicle;
        }

        fs.writeFile('vehicles.json', JSON.stringify(vehicles, null, 2), 'utf8', error => {
            if (error) {
                console.error('Error updating vehicles.json file:', error);
            } else {
                console.log('vehicles.json file updated successfully.');
            }
        });
    });
}

module.exports = {
    updateContractsJson,
    updateCustomersJson,
    updateVehiclesJson
};
