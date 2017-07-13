
var Team = function(user, className, elements) {
    this.user = user;
    this.className = className;
    this.elements = elements;
};

(function() {
    var redTeam = new Team('player', 'red-team', '<div></div>');
    var greenTeam = new Team('IA', 'green-team', '<div><div></div><div></div></div>');
    var teams = [redTeam, greenTeam];
    var currentTeamIndex = 0;
    
    function cellMatches(cell1, cell2, cell3) {
        return cell1 >= 0 && cell1 === cell2 && cell1 === cell3;
    }

    function showResults(title) {
        $('table#morpion').hide();
        var results = $('div#results');
        results.append('<h2>' + title + '</h2>');
        results.append('<button onclick="morpion.initialize(true)">Recommencer</button>');
        results.show();
    }

    var cellListener = function(event) {
        var currentPlayer = morpion.teams[morpion.currentTeam];
        var cell = $(event.currentTarget);
        cell.addClass(currentPlayer.className);
        cell.unbind('click');
        $(morpion.teams[morpion.currentTeam].elements).appendTo(cell);
        if (morpion.hasWon()) {
            showResults(morpion.teams[morpion.currentTeam].user + ' has won the game !');
        } else if (morpion.isDraw) {
            showResults('Draw game...');
        } else {
            morpion.switchPlayer();
        }
    };
    
    var hasWon = function() {
        var data = [
            [],
            [],
            []
        ];
        var dataCount = 0;
        var table = $('table#morpion')[0];
        var tbody = table.tBodies[0];
        for (var i = 0; i < tbody.children.length; ++i) {
            var line = tbody.children[i];
            for (var j = 0; j < line.children.length; ++j) {
                var cell = line.children[j];
                data[i][j] = $(cell).hasClass(teams[0].className) ? 0 : 
                    ($(cell).hasClass(teams[1].className) ? 1 : -1);
                if (data[i][j] >= 0) {
                    ++dataCount;
                }
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
        // Vérification du match nul.
        morpion.isDraw = dataCount === 9;
        return won;
    };

    var initialize = function(reinitialize) {
        $('table#morpion tr td').each(function(index, item) {
            var cell = $(item);
            if (reinitialize) {
                cell.empty();
                cell.removeClass(morpion.teams[0].className);
                cell.removeClass(morpion.teams[1].className);
                cell.unbind();
            }
            cell.click(function(event) {
                morpion.cellListener(event);
            });
        });
        if (reinitialize) {
            $('table#morpion').show();
            $('div#results').empty();
            $('div#results').hide();
            morpion.isDraw = false;
        }
    }
    
    window.morpion = {
        isDraw: false,
        teams: teams,
        currentTeam: currentTeamIndex,
        switchPlayer: function() {
            morpion.currentTeam = (morpion.currentTeam + 1) % morpion.teams.length;
        },
        hasWon : hasWon,
        cellListener: cellListener,
        initialize: initialize
    };
})();

$(document).ready(function() {
    morpion.initialize();
});