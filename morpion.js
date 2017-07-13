
var Team = function(user, className) {
    this.user = user;
    this.className = className;
};

(function() {
    var redTeam = new Team('player', 'red-team');
    var greenTeam = new Team('IA', 'green-team');
    var teams = [redTeam, greenTeam];
    var currentTeamIndex = 0;
    
    function cellMatches(cell1, cell2, cell3) {
        return cell1 >= 0 && cell1 === cell2 && cell1 === cell3;
    }
    
    var hasWon = function() {
        var data = [
            [],
            [],
            []
        ];
        var table = $('table#morpion')[0];
        var tbody = table.tBodies[0];
        for (var i = 0; i < tbody.children.length; ++i) {
            var line = tbody.children[i];
            for (var j = 0; j < line.children.length; ++j) {
                var cell = line.children[j];
                data[i][j] = $(cell).hasClass(teams[0].className) ? 0 : 
                    ($(cell).hasClass(teams[1].className) ? 1 : -1);
            }
        }
        // Vérification des lignes.
        var won = cellMatches.apply(this, data[0]);
        won = won || cellMatches.apply(this, data[1]);
        won = won || cellMatches.apply(this, data[2]);
        // Vérification des colonnes.
        won = won || cellMatches(data[0][0], data[1][0], data[2][0]);
        won = won || cellMatches(data[0][1], data[1][1], data[2][1]);
        won = won || cellMatches(data[0][2], data[1][2], data[2][2]);
        // Vérification des diagonales.
        won = won || cellMatches(data[0][0], data[1][1], data[2][2]);
        won = won || cellMatches(data[0][2], data[1][1], data[2][0]);
        
        return won;
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
        var currentPlayer = morpion.teams[morpion.currentTeam];
        var cell = $(event.currentTarget);
        cell.addClass(currentPlayer.className);
        cell.unbind('click');
        if (morpion.hasWon()) {
            console.debug(morpion.teams[morpion.currentTeam] + ' has won the game !');
        } else {
            morpion.switchPlayer();
        }
    };
    
    $('table#morpion tr td').each(function(index, cell) {
        $(cell).click(function(event) {
            cellListener(event);
        });
    });
});