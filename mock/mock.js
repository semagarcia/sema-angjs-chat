var gravatar = require('gravatar');  // 'http://www.gravatar.com/avatar/' + hash + '?s=100&r=x&d=retro',

module.exports = {
	
	/**
	 * Mock data
	 */
	lookUpUserIntoDB : function(user, pass) {
		if(user === 'sema') {
			return {
				userId : '8f2f775d-6bdf-493b-bc32-7aa8b97c2331',
			    name : 'José Manuel García',
			    charge : 'Arquitecto Júnior',
			    avatar : gravatar.url(user, {s: '100', r: 'x', d: 'retro'}, false), 
			    username : user,
			    projectRooms : [ 
			    		{ id:'5afc06e3-398a-45de-95f7-197cc07fba92', title:'Conversación global', unread:3, numUsers:4, defaultRoom:true },
                      	{ id:'f1634eaa-816c-4674-85f9-8eca537840ba', title:'Frontal', unread:3, numUsers:2 },
                      	{ id:'39a17fd7-f337-4558-95a0-fefa00ff33d7', title:'Backend', unread:7, numUsers:4 }
                ],
				p2pChats : [ 
						{ userId:'0f1e0b7b-a9a7-443d-9e56-94704b6a1d0a', who:'Adrián García Dieguez', unread:0 },
						{ userId:'1d198261-84be-4df8-82e3-6ec59ac0347d', who:'Adrián Ferreres Estelles', unread:1 },
						{ userId:'4919bed9-d7a9-40b4-a982-c092f35e650d', who:'Iván Jerez Córdoba', unread:2 },
						{ userId:'cfc782b8-23b7-45f8-808a-122c339ea874', who:'José Alberto Virto Estrada', unread:0 },
						{ userId:'477b8877-190b-41e9-b6f4-757a6a4262d5', who:'Rafael González Rodriguez', unread:0 },
						{ userId:'4ad2bc67-0945-49ab-9fbd-99344c9f0cad', who:'Víctor Ocariz Martínez', unread:0 }
				],  
    			otherGroups : [
    					{ groupId:'6aa6be33-d557-47b1-a0e8-a0d0db1aad1b', title:'Arquitectos Mapfre', unread:0, numUsers:3 },
    					{ groupId:'6cd2a258-93b1-4385-822c-818024789f58', title:'Grupo conocimiento ARQ', unread:6, numUsers:7 }
    			]
			};
		} else if(user === 'adrian') {
			return {
				userId : '1d198261-84be-4df8-82e3-6ec59ac0347d',
			    name : 'Adrián Ferreres Estelles',
			    charge : 'Arquitecto JS Senior',
			    avatar : gravatar.url(user, {s: '100', r: 'x', d: 'retro'}, false), 
			    username : user,
			    projectRooms : [ 
			    		{ id:'5afc06e3-398a-45de-95f7-197cc07fba92', title:'Conversación global', unread:3, numUsers:4, defaultRoom:true },
                      	{ id:'f1634eaa-816c-4674-85f9-8eca537840ba', title:'Frontal', unread:3, numUsers:2 },
                      	{ id:'39a17fd7-f337-4558-95a0-fefa00ff33d7', title:'Backend', unread:7, numUsers:4 }
                ],
				p2pChats : [ 
						{ userId:'0f1e0b7b-a9a7-443d-9e56-94704b6a1d0a', who:'Adrián García Dieguez', unread:0 },
						{ userId:'4919bed9-d7a9-40b4-a982-c092f35e650d', who:'Iván Jerez Córdoba', unread:2 },
						{ userId:'cfc782b8-23b7-45f8-808a-122c339ea874', who:'José Alberto Virto Estrada', unread:0 },
						{ userId:'8f2f775d-6bdf-493b-bc32-7aa8b97c2331', who:'José Manuel García García', unread:1 },
						{ userId:'477b8877-190b-41e9-b6f4-757a6a4262d5', who:'Rafael González Rodriguez', unread:0 },
						{ userId:'4ad2bc67-0945-49ab-9fbd-99344c9f0cad', who:'Víctor Ocariz Martínez', unread:0 }
				],  
    			otherGroups : [
    					{ groupId:'7aad0fd0-c891-4acd-bc0f-81efc134150e', title:'Arquitectos BBVA', unread:0, numUsers:3 },
    					{ groupId:'6cd2a258-93b1-4385-822c-818024789f58', title:'Grupo conocimiento ARQ', unread:6, numUsers:7 }
    			]
			};
		} else if(user === 'ivan') {
			return {
				userId : '4919bed9-d7a9-40b4-a982-c092f35e650d',
			    name : 'Ivan Jerez Córdoba',
			    charge : 'Solution Knowledge Leader',
			    avatar : gravatar.url(user, {s: '100', r: 'x', d: 'retro'}, false), 
			    username : user,
			    projectRooms : [ 
			    		{ id:'5afc06e3-398a-45de-95f7-197cc07fba92', title:'Conversación global', unread:3, numUsers:4, defaultRoom:true },
                      	{ id:'f1634eaa-816c-4674-85f9-8eca537840ba', title:'Frontal', unread:3, numUsers:2 },
                      	{ id:'39a17fd7-f337-4558-95a0-fefa00ff33d7', title:'Backend', unread:7, numUsers:4 }
                ],
				p2pChats : [ 
						{ userId:'1d198261-84be-4df8-82e3-6ec59ac0347d', who:'Adrián Ferreres Estelles', unread:1 },
						{ userId:'0f1e0b7b-a9a7-443d-9e56-94704b6a1d0a', who:'Adrián García Dieguez', unread:0 },
						{ userId:'cfc782b8-23b7-45f8-808a-122c339ea874', who:'José Alberto Virto Estrada', unread:0 },
						{ userId:'8f2f775d-6bdf-493b-bc32-7aa8b97c2331', who:'José Manuel García García', unread:1 },
						{ userId:'477b8877-190b-41e9-b6f4-757a6a4262d5', who:'Rafael González Rodriguez', unread:0 },
						{ userId:'4ad2bc67-0945-49ab-9fbd-99344c9f0cad', who:'Víctor Ocariz Martínez', unread:0 }
				],  
    			otherGroups : [
    					{ groupId:'7aad0fd0-c891-4acd-bc0f-81efc134150e', title:'Arquitectos BBVA', unread:0, numUsers:3 },
    					{ groupId:'6cd2a258-93b1-4385-822c-818024789f58', title:'Grupo conocimiento ARQ', unread:6, numUsers:7 }
    			]
			};
		} else if(user === 'rafael') {
			return {
				userId : '477b8877-190b-41e9-b6f4-757a6a4262d5',
			    name : 'Rafael González Rodriguez',
			    charge : 'Solution Technology',
			    avatar : gravatar.url(user, {s: '100', r: 'x', d: 'retro'}, false), 
			    username : user,
			    projectRooms : [ 
			    		{ id:'5afc06e3-398a-45de-95f7-197cc07fba92', title:'Conversación global', unread:3, numUsers:4, defaultRoom:true },
                      	{ id:'f1634eaa-816c-4674-85f9-8eca537840ba', title:'Frontal', unread:3, numUsers:2 },
                      	{ id:'39a17fd7-f337-4558-95a0-fefa00ff33d7', title:'Backend', unread:7, numUsers:4 }
                ],
				p2pChats : [ 
						{ userId:'1d198261-84be-4df8-82e3-6ec59ac0347d', who:'Adrián Ferreres Estelles', unread:1 },
						{ userId:'0f1e0b7b-a9a7-443d-9e56-94704b6a1d0a', who:'Adrián García Dieguez', unread:0 },
						{ userId:'4919bed9-d7a9-40b4-a982-c092f35e650d', who:'Ivan Jerez Córdoba', unread:0 },
						{ userId:'cfc782b8-23b7-45f8-808a-122c339ea874', who:'José Alberto Virto Estrada', unread:0 },
						{ userId:'8f2f775d-6bdf-493b-bc32-7aa8b97c2331', who:'José Manuel García García', unread:1 },
						{ userId:'4ad2bc67-0945-49ab-9fbd-99344c9f0cad', who:'Víctor Ocariz Martínez', unread:0 }
				],  
    			otherGroups : [
    					{ groupId:'7aad0fd0-c891-4acd-bc0f-81efc134150e', title:'Arquitectos BBVA', unread:0, numUsers:3 },
    					{ groupId:'6cd2a258-93b1-4385-822c-818024789f58', title:'Grupo conocimiento ARQ', unread:6, numUsers:7 }
    			]
			};
		} else if(user === 'victor') {
			return {
				userId : '4ad2bc67-0945-49ab-9fbd-99344c9f0cad',
			    name : 'Víctor Ocariz Martinez',
			    charge : 'Solution Technology',
			    avatar : gravatar.url(user, {s: '100', r: 'x', d: 'retro'}, false), 
			    username : user,
			    projectRooms : [ 
			    		{ id:'5afc06e3-398a-45de-95f7-197cc07fba92', title:'Conversación global', unread:3, numUsers:4, defaultRoom:true },
                      	{ id:'f1634eaa-816c-4674-85f9-8eca537840ba', title:'Frontal', unread:3, numUsers:2 },
                      	{ id:'39a17fd7-f337-4558-95a0-fefa00ff33d7', title:'Backend', unread:7, numUsers:4 }
                ],
				p2pChats : [ 
						{ userId:'1d198261-84be-4df8-82e3-6ec59ac0347d', who:'Adrián Ferreres Estelles', unread:1 },
						{ userId:'0f1e0b7b-a9a7-443d-9e56-94704b6a1d0a', who:'Adrián García Dieguez', unread:0 },
						{ userId:'4919bed9-d7a9-40b4-a982-c092f35e650d', who:'Ivan Jerez Córdoba', unread:0 },
						{ userId:'cfc782b8-23b7-45f8-808a-122c339ea874', who:'José Alberto Virto Estrada', unread:0 },
						{ userId:'8f2f775d-6bdf-493b-bc32-7aa8b97c2331', who:'José Manuel García García', unread:1 },
						{ userId:'477b8877-190b-41e9-b6f4-757a6a4262d5', who:'Rafael González Rodriguez', unread:0 }
				],  
    			otherGroups : [
    					{ groupId:'7aad0fd0-c891-4acd-bc0f-81efc134150e', title:'Arquitectos BBVA', unread:0, numUsers:3 },
    					{ groupId:'6cd2a258-93b1-4385-822c-818024789f58', title:'Grupo conocimiento ARQ', unread:6, numUsers:7 }
    			]
			};
		} else if(user === 'guest') {
			return {
				userId : '5b343c67-281e-40a4-893c-a8ba00b56cd8',
			    name : 'Usuario invitado',
			    charge : ':: Invitado ::',
			    avatar : gravatar.url(user, {s: '100', r: 'x', d: 'retro'}, false), 
			    username : user,
			    projectRooms : [ 
			    		{ id:'5afc06e3-398a-45de-95f7-197cc07fba92', title:'Conversación global', unread:3, numUsers:4, defaultRoom:true },
                      	{ id:'f1634eaa-816c-4674-85f9-8eca537840ba', title:'Frontal', unread:3, numUsers:2 },
                      	{ id:'39a17fd7-f337-4558-95a0-fefa00ff33d7', title:'Backend', unread:7, numUsers:4 }
                ],
				p2pChats : [ ],  
    			otherGroups : [ ]
			};
		} else
			return null;
	}
	
};