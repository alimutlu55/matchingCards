import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import HomeScreen from '../screens/HomeScreen';
import CardScreen from '../screens/CardScreen';
import CompetitionScreen from '../screens/CompetitionScreen'
import PreCompetitionScreen from '../screens/PreCompetitionScreen'
import GameFinishScreen from '../screens/GameFinishScreen'
import EndOfGameScreen from '../screens/EndOfGameScreen'
import CardSelectScreen from '../screens/CardSelectScreen'
import SelectHardShipScreen from '../screens/SelectHardShipScreen'

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Card: CardScreen,
        GameFinish: GameFinishScreen,
        Competition: CompetitionScreen,
        PreCompetition: PreCompetitionScreen,
        EndOfGame: EndOfGameScreen,
        CardSelect: CardSelectScreen,
        HardShip: SelectHardShipScreen
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            header: null
        }
    }
);



export default createAppContainer(AppNavigator);