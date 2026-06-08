let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const text=document.querySelector("#text");
const xpText=document.querySelector("#xpText");
const healthText=document.querySelector("#healthText");
const goldText=document.querySelector("#goldText");
const monsterStats=document.querySelector("#monsterStats");
const monsterNameText=document.querySelector("#monsterName");
const monsterHealthText=document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "Slime",
        level: 2,
        health: 15
    },
    {
        name: "Fanged Beast",
        level:10,
        health:60
    },
    {
        name: "Dragon",
        level: 50,
        health:300,
    }
]
const locations = [
    {
        name: 'Town Square',
        "button text": ["Go to store","Go to cave","Fight dragon"],
        "button function": [goStore, goCave, fightDragon],
        text: "You are in the town. You see a sign that says \"Store\""
    },
    {
        name: 'Store',
        "button text": ["Buy 10 health (10 gold)","Buy a weapon (30 gold)","Go to town square"],
        "button function": [buyHealth, buyWeapon, goTown],
        text: "You enter the store.."
    },
    {
        name: 'Cave',
        "button text": ["Fight slime","Fight fanged beast","Go to town square"],
        "button function": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. There are lots of monsters"
    },
    {
        name: 'Fight',
        "button text": ["Attack", "Dodge", "Run"],
        "button function": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: 'killed monster',
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button function": [goTown, goTown, goTown],
        text: "The monster screams. And the voice echos. You turn and the monster is dead.\n\nCongratulations.\nYou gained experience points and gold."
    },
    {
        name: 'lose',
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button function": [restart, restart, restart],
        text: "You died."
    },
    {
        name: 'win game',
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button function": [restart, restart, restart],
        text: "🎉You defeat the dragon.You win the game. 🎉\n\nRESTART?"
    }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location)
{
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    text.innerText = location.text;
    
    button1.onclick = location["button function"][0];
    button2.onclick = location["button function"][1];
    button3.onclick = location["button function"][2];
}

function goTown()
{
    update(locations[0]);
}

function goStore()
{
    update(locations[1]);
}

function goCave()
{
    update(locations[2]);
}

function buyHealth()
{
    if (gold>=10)
    {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "Your health increased."
    }
    else
    {
        text.innerText = "You don't have enough gold.";
    }
}

function buyWeapon()
{
    if(currentWeapon < weapons.length - 1)
    {
        if (gold>=30)
        {
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a \"" + newWeapon + "\".";
            inventory.push(newWeapon);
            text.innerText += "\n\nYour inventory: {" + inventory + "}.";
        }
        else
        {
            text.innerText = "You don't have enough gold.";
        }
    }
    else
    {
        text.innerText = "You already have the most powerful weapons.\n\n"
        button2.innerText = "Sell your weapon for 15 gold?"
        button2.onclick = sellweapon;
    }
}

function sellweapon()
{
    if(inventory.length > 1)
    {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold " + currentWeapon + ".";
        text.innerText += "Your inventory: {" + inventory + "}.";
    }
    else
    {
        text.innerText = "Don't sell your only weapon.";
    }
}

function goFight()
{
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function fightSlime()
{
    fighting = 0;
    goFight();
}

function fightBeast()
{
    fighting = 1;
    goFight();
}

function fightDragon()
{
    fighting = 2;
    goFight();
}

function attack()
{
    text.innerText = "The " + monsters[fighting].name + " attacked.";
    text.innerText += "\n\nYou can attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText =  health;
    monsterHealthText.innerText = monsterHealth;
    if(health<=0)
    {
        lose();
    }
    else if(monsterHealth<=0)
    {
        fighting == 2? winGame() : defeatMonster();
    }
}

function dodge()
{
    text.innerText = "You dodged the attack from " + monsters[fighting].name + ".";

}

function lose()
{
    update(locations[5]);
}

function winGame()
{
    update(locations[6]);
}

function defeatMonster()
{
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart()
{
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    xpText.innerText = xp;
    healthText.innerText = health;
    goTown();
}