'use strict';
exports.BattleScripts = {
	getTeam: function (side, team) {
		const format = this.getFormat();
		const teamGenerator = typeof format.team === 'string' && format.team.startsWith('random') ? format.team + 'Team' : '';
		if (!teamGenerator && team) return team;
		// Reinitialize the RNG seed to create random teams.
		this.seed = this.generateSeed();
		this.startingSeed = this.startingSeed.concat(this.seed);
		team = this[teamGenerator || 'randomTeam'](side);
		// Restore the default seed
		this.seed = this.startingSeed.slice(0, 4);
		for(let i = 0 ;i < team.length ; i++) {
			team[i].donorSpecies = this.getTemplate(toId(team[i].set.name.split(" (")[1])).species;
			team[i].name = team[i].set.name = team[i].set.name.split(" (")[0].substr(0, 20);
		}
		return team;
	},
};