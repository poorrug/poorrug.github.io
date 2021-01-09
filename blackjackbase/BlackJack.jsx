import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import whiteBulletPointImg from '../../resources/svgs/bulletpoint-white.svg'
import BlackBulletPointImg from '../../resources/svgs/bulletpoint-black.svg'
import CardList from '../../components/FAQ/CardList'
import CardList2 from '../../components/FAQ/CardList2'
import CardGrid from '../../components/FAQ/CardGrid'
import Lottie from "react-lottie";
import animationData from "../../resources/lotties/hangman.json";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    aboutPoorRug: {
        justifyContent: 'center',
        marginBottom: 60,
        marginTop: 50
    },
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    section1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'start',
        fontFamily: 'inter-regular',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        marginTop: 0,
        maxWidth: 650,
        [theme.breakpoints.down('xs')]: {
            margin: 0
        }
    },
    section2: {
        maxWidth: 900,
        marginTop: 50
    }

}))

const list1Data = [
    "You first need to acquire some Poor tokens from Uniswap and some ETH." +
    " Then" +
    " select the liquidity tab above to add liquidity and obtain Poor/ETH" +
    " LP" +
    " tokens.",
    "You then need to press the Approve button to allow the contract" +
    " to stake your tokens ",
    "After the approval has succeeded, you should be able to stake" +
    " any" +
    " amount of LP tokens",
    "You can then harvest any $Poor that you have earned during the staking" +
    " period! If you need any assistance, please message us on Telegram!"]

const list2Data = [
    "Many of you may be familiar with the PoorFag ($FAG) memecoin, known as $FAG. It was created as a copy of $BONK with 2% transfer fee for every transaction, and a staking pool to collect the transfer fees, to exit the pool there is a 5% unstaking fee also going to the staking pool.",
    "$FAG gained a decent amount of attention on Twitter. Unfortunately, the" +
    " developer of the project (Telegram: @bestetherdapps aka Joe Blow)" +
    " decided to sell his stake, and claimed he did this without warning in" +
    " order to not cause a panic sell. Obviously this was not well received" +
    " by the community and a massive price drop followed, therefore we have" +
    " decided to create another project that would be 1:1 token swap for" +
    " $FAG token",
    "Why another project? There is already an established community around" +
    " the $FAG token, it makes sense bring them over to PoorRug.",
    "The total supply of $Poor is 791,210. 491,210 is migrated from $FAG," +
    " 270,000 is liquidity farmed and 30,000 is reserved for marketing and" +
    " development."
]

const list3Data = [
    "A group of experienced blockchain developers and traders are behind PoorRug. They have decided to stay anonymous at this time. If you feel like you can contribute, feel free to contact one of the admins on telegram."
]

const list4Data = [
    "Farming: 0x94bD71cEAeF35f8e7479125d866ba9f4F01dfEFA",
    "PoorRug: 0x9d24b60d5eefe710348cc59173b166a256cbffcd",
]

const BlackJack = () => {

    const classes = useStyles()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={classes.pageContainer}>


                <object type="text/html" data="https://mistergalactic.github.io/blackjack/"
                        style={{width:'100%', height:700}}/>
        </div>
    )

}

export default BlackJack