const Colocs = require('./Colocs');
const Tasks = require('./Tasks');
const Users = require('./Users');

// un user peut avoir une coloc 
//mais un user peut changer de coloc
// un user peut avoir plusieurs tasks
// une task peut etre detenue par plusieurs user

// a user can have several colocs
Users.hasMany(Colocs, { 
    as: 'coloc', 
    foreignKey: 'user_id' 
});

// a user can only belong to one coloc at a time
Users.belongsTo(Colocs, { 
    as: 'coloc', 
    foreignKey: 'current_coloc_id' 
});

// a coloc can have several users
Colocs.hasMany(Users, { 
    as: 'user', 
    foreignKey: 'current_coloc_id' 
});


// Colocs.belongsTo(Users, { 
//     as: 'user', 
//     foreignKey: 'user_id' 
// });

// a user can have several tasks
Users.hasMany(Tasks, { 
    as: 'task', 
    foreignKey: 'user_id' 
});

// a task can belong to a few users
Tasks.hasMany(Users,{
    as: 'user',
    foreignKey: 'user_id'
}); 


module.exports = { Colocs, Users, Tasks };