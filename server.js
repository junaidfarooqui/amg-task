const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 443;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Set up a custom middleware to handle CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with your Angular app's URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Define the API route for updating the contracts
app.put('/api/contract', (req, res) => {
    const updatedContract = req.body;

    // Read the existing contracts from the file
    fs.readFile('src/assets/data/contracts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read contracts file' });
        }

        // Parse the JSON data from the file
        let contracts = [];
        try {
            contracts = JSON.parse(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to parse contracts file' });
        }

        // Find the contract to update by its id
        const updatedContracts = contracts.map((contract) => {
            if (contract.id == parseInt(updatedContract.id)) {
                // Merge the updatedContract data
                contract = { ...contract, ...updatedContract };

                // Update the customer data in customers.json
                const customerToUpdate = updatedContract.customer;
                const customerId = customerToUpdate.id;

                fs.readFile('src/assets/data/customers.json', 'utf8', (err, customerData) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Failed to read customers file' });
                    }

                    let customers = [];
                    try {
                        customers = JSON.parse(customerData);
                    } catch (error) {
                        console.error(error);
                        return res.status(500).json({ error: 'Failed to parse customers file' });
                    }

                    const updatedCustomers = customers.map((customer) => {
                        if (customer.id == customerId) {
                            return { ...customer, ...customerToUpdate };
                        }
                        return customer;
                    });

                    // Write the updated customers back to the file
                    fs.writeFile('src/assets/data/customers.json', JSON.stringify(updatedCustomers, null, 2), 'utf8', (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: 'Failed to update customers file' });
                        }
                    });
                });

                // Update the vehicle data in vehicles.json
                const vehicleToUpdate = updatedContract.vehicle;
                const vehicleId = vehicleToUpdate.id;

                fs.readFile('src/assets/data/vehicles.json', 'utf8', (err, vehicleData) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Failed to read vehicles file' });
                    }

                    let vehicles = [];
                    try {
                        vehicles = JSON.parse(vehicleData);
                    } catch (error) {
                        console.error(error);
                        return res.status(500).json({ error: 'Failed to parse vehicles file' });
                    }

                    const updatedVehicles = vehicles.map((vehicle) => {
                        if (vehicle.id == vehicleId) {
                            return { ...vehicle, ...vehicleToUpdate };
                        }
                        return vehicle;
                    });

                    // Write the updated vehicles back to the file
                    fs.writeFile('src/assets/data/vehicles.json', JSON.stringify(updatedVehicles, null, 2), 'utf8', (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: 'Failed to update vehicles file' });
                        }
                    });
                });
            }
            return contract;
        });

        // Write the updated contracts back to the file
        fs.writeFile('src/assets/data/contracts.json', JSON.stringify(updatedContracts, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to update contracts file' });
            }

            return res.json({ message: 'Contract updated successfully' });
        });
    });
});

// Define the API route for getting vehicle details by ID
app.get('/api/vehicles/:id', (req, res) => {
    const vehicleId = parseInt(req.params.id);

    // Read the contracts from the file
    fs.readFile('src/assets/data/contracts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read contracts file' });
        }

        // Parse the JSON data from the file
        let contracts = [];
        try {
            contracts = JSON.parse(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to parse contracts file' });
        }

        // Find the contracts where the vehicle is in use
        const matchingContracts = contracts.filter((contract) => contract.vehicle.id === vehicleId);

        /*if (matchingContracts.length === 0) {
            return res.status(200).json({ error: 'No contracts found for the vehicle' });
        }*/

        return res.json(matchingContracts);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
