class Station {
  constructor() {
    this.resources = {
      SpaceJunk: 0,
      Credits: 0,
      Metal: 0,
      Plastic: 0,
    };
    this.modules = [
      { name: "Core Module", type: "multi", cost: 0, workersRequired: 1, workersAssigned: 0, rate: 1, available: 0, purchased: 0, installed: 1 },
      { name: "Metal Refinery", type: "process", cost: 500, workersRequired: 1, workersAssigned: 0, rate: 0.05, available: 1, purchased: 0, installed: 0 },
      { name: "Plastic Refinery", type: "process", cost: 1000, workersRequired: 1, workersAssigned: 0, rate: 0.025, available: 1, purchased: 0, installed: 0 }
    ];
    this.workers = {
      available: 1,
      assigned: 0,
      total: 1
    };
    this.equipment = [];
    this.rocket = 1;
    this.licenseModulesLevel = 1;
    this.maxModules = 3;
  }


  // Resource collection methods
  collectSpaceJunk() {
    this.resources.SpaceJunk += 1;
  }

  sellSpaceJunk() {
    this.resources.SpaceJunk -= 1;
    this.resources.Credits += 235000;
  }


  // Module construction methods
  buyModule(type) {
    const moduleName = module.querySelector('.module-name').innerHTML;
    const moduleData = Station.modules.find(module => module.name === moduleName);
    const moduleCost = moduleData.cost;
    const moduleWorkers = moduleData.workersRequired;
    if (Station.resources.Credits >= moduleCost) {
      Station.resources.Credits -= moduleCost;
      // totalResources += moduleCost * 10; // Each module generates 10 resources per second
      document.getElementById('spaceJunkListItem').innerHTML = Station.resources.SpaceJunk;
      // document.getElementById('total-resources').innerHTML = totalResources;
      const moduleCount = parseInt(module.querySelector('.module-count').innerHTML);
      moduleCount++;
      module.querySelector('.module-count').innerHTML = moduleCount;
      module.querySelector('.module-workers-assigned').innerHTML = 0;
    }
    
    
    if (this.modules.installed.length >= this.maxModules) {
      console.log("Max modules reached.");
      return;
    }


    this.resources.Metal -= moduleInfo.cost.Metal;
    this.resources.Plastic -= moduleInfo.cost.Plastic;
    console.log(`Built ${type} module.`);
    this.updateLists();
  }


  // Worker hiring methods
  hireWorker() {
    if (this.resources.Metal < 5 || this.resources.Plastic < 5) {
      console.log("Insufficient resources.");
      return;
    }

    // this

    this.resources.Credits -= 500000;
    this.workers.push({
      type: "Unassigned"
    });
    console.log(`Hired a worker.`);
    this.updateLists();
  }


  assignWorker(workerIndex, moduleIndex) {
    const module = this.modules[moduleIndex];
    if (!worker || !module) {
      console.log("Invalid worker or module index.");
      return;
    }

    const moduleType = module.type;
    if (Station.WorkerModuleMap[workerType] !== moduleType) {
      console.log(`Cannot assign ${workerType} worker to ${moduleType} module.`);
      return;
    }

    module.workers.push(workerIndex);
    this.updateLists();
  }


  // Equipment construction methods
  buildEquipment(type) {
    const equipmentInfo = Station.Equipment[type];
    if (!equipmentInfo) {
      console.log("Invalid equipment type.");
      return;
    }


    if (this.resources.Metal < equipmentInfo.cost.Metal || this.resources.Plastic < equipmentInfo.cost.Plastic) {
      console.log("Insufficient resources.");
      return;
    }


    this.resources.Metal -= equipmentInfo.cost.Metal;
    this.resources.Plastic -= equipmentInfo.cost.Plastic;
    this.equipment.push(type);
    console.log(`Built ${type} equipment.`);
    this.updateLists();
  }


  // License upgrade method
  upgradeLicense() {
    const licenseInfo = Station.License[this.licenseLevel];
    if (!licenseInfo) {
      console.log("Max license level reached.");
      return;
    }


    if (this.resources.Metal < licenseInfo.cost.Metal || this.resources.Plastic < licenseInfo.cost.Plastic) {
      console.log("Insufficient resources.");
      return;
    }


    this.resources.Metal -= licenseInfo.cost.Metal;
    this.resources.Plastic -= licenseInfo.cost.Plastic;
    this.licenseLevel += 1;
    this.maxModules += 1;
    console.log(`Upgraded license to level ${this.licenseLevel}.`);
    this.updateLists();
  }

 
  // Update display methods
  updateLists() {
    // Resources list
    document.getElementById("metalListItem").innerHTML = this.resources.Metal;
    document.getElementById("plasticListItem").innerHTML = `${this.resources.Plastic}`;
    document.getElementById("spaceJunkListItem").innerHTML = `${this.resources.SpaceJunk}`;
    
    const creditsUSD = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'USD',
    }).format(this.resources.Credits);
    document.getElementById("creditsListItem").innerHTML = `${creditsUSD}`;
    
    document.getElementById("workersAvailable").innerHTML = this.workers.available;
    document.getElementById("workersTotal").innerHTML = this.workers.total;

    
    // Modules available list
    const modulesAvailableList = document.getElementById("modulesAvailableList");
    modulesAvailableList.innerHTML = "";
    for (let i = 0; i < this.modules.length; i++) {
      if (this.modules[i].available > 0) {
        const module = this.modules[i];
        const moduleItem = document.createElement("li");
        moduleItem.innerHTML = `${module.name}`;
        modulesAvailableList.appendChild(moduleItem);
        if (this.selectedModuleIndex === i) {
          moduleItem.classList.add("selected");
        }
        moduleItem.addEventListener("click", () => {
          this.selectModule(i);
        });
        modulesAvailableList.appendChild(moduleItem);
      }
    }
    

    // Modules purchased list
    const modulesPurchasedList = document.getElementById("modulesPurchasedList");
    modulesPurchasedList.innerHTML = "";
    for (let i = 0; i < this.modules.length; i++) {
      if (this.modules[i].purchased > 0) {
        const module = this.modules[i];
        const moduleItem = document.createElement("li");
        moduleItem.innerHTML = `${module.name}`;
        modulesPurchasedList.appendChild(moduleItem);
        if (this.selectedModuleIndex === i) {
          moduleItem.classList.add("selected");
        }
        moduleItem.addEventListener("click", () => {
          this.selectModule(i);
        });
        modulesPurchasedList.appendChild(moduleItem);
      }
    }

    // Modules installed list
    const modulesInstalledList = document.getElementById("modulesInstalledList");
    modulesInstalledList.innerHTML = "";
    for (let i = 0; i < this.modules.length; i++) {
      if (this.modules[i].installed > 0) {
        const module = this.modules[i];
        const moduleItem = document.createElement("li");
        moduleItem.innerHTML = `${module.name}`;
        modulesInstalledList.appendChild(moduleItem);
        if (this.selectedModuleIndex === i) {
          moduleItem.classList.add("selected");
        }
        moduleItem.addEventListener("click", () => {
          this.selectModule(i);
        });
        modulesInstalledList.appendChild(moduleItem);
      }
    }
    

    /*
    // General function for modules lists
    function updateModuleList(list, item, filterBy) {
      const modulesList = document.getElementById(list);
      modulesList.innerHTML = "";
      for (let i = 0; i < item.modules.length; i++) {
        if (item.modules[i].filterBy > 0) {
          const module = item.modules[i];
          const moduleItem = document.createElement("li");
          moduleItem.innerHTML = `${module.name}`;
          list.appendChild(moduleItem);
          if (item.selectedModuleIndex === i) {
            moduleItem.classList.add("selected");
          }
          moduleItem.addEventListener("click", () => {
            item.selectModule(i);
          });
          list.appendChild(moduleItem);
        }
      }
    }
    

    updateModuleList("modulesAvailableList", "Station", "available");
    updateModuleList(modulesPurchasedList, purchased);
    updateModuleList(modulesInstalledList, installed);

    */
    
    /*
    // Equipment list
    const equipmentList = document.getElementById("equipmentList");
    equipmentList.innerHTML = "";
    for (let i = 0; i < this.equipment.length; i++) {
      const equipmentType = this.equipment[i];
      const equipmentInfo = Station.Equipment[equipmentType];
      const equipmentItem = document.createElement("li");
      equipmentItem.innerHTML = `${equipmentType} equipment (Metal: ${equipmentInfo.cost.Metal}, Plastic: ${equipmentInfo.cost.Plastic})`;
      equipmentList.appendChild(equipmentItem);
    }


    // License upgrade button
    const upgradeLicenseButton = document.getElementById("upgradeLicenseButton");
    const licenseInfo = Station.License[this.licenseLevel];
    upgradeLicenseButton.innerHTML = `Upgrade license (Metal: ${licenseInfo.cost.Metal}, Plastic: ${licenseInfo.cost.Plastic})`;
    */

    /*
    // Assign worker button
    const assignWorkerButton = document.getElementById("assignWorkerButton");
    if (this.selectedWorkerIndex === null || this.selectedModuleIndex === null) {
      assignWorkerButton.disabled = true;
    } else {
      assignWorkerButton.disabled = false;
    }

    const relesaseWorkerButton = document.getElementById("releaseWorkerButton");
    if (this.selectedWorkerIndex === null || this.selectedModuleIndex === null) {
      assignWorkerButton.disabled = true;
    } else {
      releaseWorkerButton.disabled = false;
    }
    */


    // Sell SpaceJunk button
    const sellSpaceJunkButton = document.getElementById("sellSpaceJunkButton");
    if (this.resources.SpaceJunk == 0) {
      sellSpaceJunkButton.disabled = true
    } else {
      sellSpaceJunkButton.disabled = false
    }
  }

  


  // UI event handlers
  selectModule(moduleIndex) {
    this.selectedModuleIndex = moduleIndex;
    this.selectedWorkerIndex = null;
    this.updateLists();
  }


  selectWorker(workerIndex) {
    this.selectedModuleIndex = null;
    this.selectedWorkerIndex = workerIndex;
    this.updateLists();
  }


  assignWorkerToSelectedmodule() {
    this.assignWorker(this.selectedWorkerIndex, this.selectedModuleIndex);
    this.selectedModuleIndex = null;
    this.selectedWorkerIndex = null;
  }
}


const station = new Station();
station.updateLists();
// Initialization Complete
const updateStatus = document.getElementById("status").innerHTML = "Status: R E A D Y";

// UI event listeners
const collectSpaceJunkButton = document.getElementById("collectSpaceJunkButton");
collectSpaceJunkButton.addEventListener("click", () => {
  station.collectSpaceJunk();
  station.updateLists();
});

const sellSpaceJunkButton = document.getElementById("sellSpaceJunkButton");
sellSpaceJunkButton.addEventListener("click", () => {
  station.sellSpaceJunk();
  station.updateLists();
});

/*
const assignWorkerButton = document.getElementById("assignWorkerButton");
assignWorkerButton.addEventListener("click", () => {
  station.assignWorkerToSelectedModule();
  station.updateLists();
});
*/

/* To do
New plan: gather the space junk and it can be dropped to earth
This requires knowing that a rocket came up - in this case, the one
the player took up to space. Question: Does the player start with
metal or plastic refineries? I think no. There should be a value of 
the space junk clearing and sending to earth to recycle. This is
less than the value of keeping metals in space to sell, or the value
of the refined materials being sent to earth. To send a shipment down
the player must fill the payload, based on the type of rocket
used, and then drop it to earth. This implies that the player would
need to wait for another rocket to send another payload. hmmm




const upgradeLicenseButton = document.getElementById("upgradeLicenseButton");
upgradeLicenseButton.addEventListener("click", () => {
  station.upgradeLicense();
  station.updateLists();
});

/*
const buyEquipmentButtons = document.querySelectorAll(".buyEquipmentButton");
buyEquipmentButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    station.buyEquipment(index);
    station.updateLists();
  });
});
*/