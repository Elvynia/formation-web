
var Team = function(user, className) {
    this.user = user;
    this.className = className;
};

(function() {
    var redTeam = new Team('player', 'red-team');
    var greenTeam = new Team('IA', 'green-team');
    var teams = [redTeam, greenTeam];
    var currentTeamIndex = 0;
    
    var hasWon = function() {
        var data = [
            [],
            [],
            []
        ];
        var table = $('table#morpion')[0];
        var tbody = table.tbodies[0];
        for (var i = 0; i < tbody.children.length; ++i) {
            var line = tbody.children[i];
            for (var j = 0; j < line.children.length; ++j) {
                var cell = line.children[j];
                data[i][j] = $(cell).hasClass(teams[0].className) ? 0 : 
                    ($(cell).hasClass(teams[1].className) ? 1 : -1);
            }
        }
        // TODO: Vérifier les données pour savoir si un joueur a gagné.
    };
    
    window.morpion = {
        teams: teams,
        currentTeam: currentTeamIndex,
        switchPlayer: function() {
            morpion.currentTeam = (morpion.currentTeam + 1) % morpion.teams.length;
        },
        hasWon : hasWon
    };
})();

$(document).ready(function() {
    var cellListener = function(event) {
        var currentPlayer = teams[currentTeamIndex];
        var cell = $(event.currentTarget);
        cell.addClass(currentPlayer.className);
        cell.unbind('click');
        switchPlayer();
    };
    
    $('table#morpion tr td').each(function(index, cell) {
        $(cell).click(function(event) {
            cellListener(event);
        });
    });
});