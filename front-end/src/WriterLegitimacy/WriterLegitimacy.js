import React, {Component} from 'react';
import './WriterLegitimacy.css';
import {Pie} from 'react-chartjs-2';
import {HorizontalBar} from 'react-chartjs-2';
import { CSSTransitionGroup } from 'react-transition-group';
import ReactTooltip from 'react-tooltip';

const backColor = 'rgba(0, 0, 0, 0.6)';
const hoverBackColor = 'rgba(0, 0, 0, 0.8)';
const borderColor = 'rgba(255, 215, 0, 1)';


function createTraitData(name, confidence, backColorPos, backColorNeg, hoverColorPos, hoverColorNeg, borderColorPos, borderColorNeg) {
    return {
        labels: ['+' + name, '-' + name],
        datasets: [{
            label: name,
            data: [confidence * 100, 100 - confidence * 100],
            backgroundColor: [
                backColorPos,
                backColorNeg,
            ],
            hoverBackgroundColor: [
                hoverColorPos,
                hoverColorNeg,
            ],
            borderColor: [
                borderColorPos,
                borderColorNeg,
            ],
            borderWidth: 1,
        }]
    };
}

function createFacetData(name, confidence, backColor, hoverColor, borderColor) {
    const temp = confidence.map(((x) => {return x * 100}));
    return {
        labels: name,
        datasets: [{
            label: '',
            data: temp,
            backgroundColor: backColor,
            hoverBackgroundColor: hoverColor,
            borderColor: borderColor,
            borderWidth: 1,
        }]
    };
}

class WriterLegitimacy extends Component {
    constructor(props) {
        super(props);
        const data = this.props.personality;

        this.author_legitimacy = ''

        switch(this.props.author_legitimacy) {
            case 'Untrustworthy':
                this.author_legitimacy = <span className='untrustworthy'>{this.props.author_legitimacy}</span>
                break;
            case 'Questionable':
                this.author_legitimacy = <span className='questionable'>{this.props.author_legitimacy}</span>
                break;
            case 'Neutral':
                this.author_legitimacy = <span className='neutral'>{this.props.author_legitimacy}</span>
                break;
            case 'Trustworthy':
                this.author_legitimacy = <span className='trustworthy'>{this.props.author_legitimacy}</span>
                break;
            default:
                this.author_legitimacy = this.props.author_legitimacy;
        }

        this.open_desc = 'The extent to which a person is open to experiencing different activities';
        this.cons_desc = 'A person\'s tendency to act in an organized or thoughtful way';
        this.extra_desc = 'A person\'s tendency to seek stimulation in the company of others';
        this.agree_desc = 'A person\'s tendency to be compassionate and cooperative toward others';
        this.neuro_desc = 'The extent to which a person\'s emotions are sensitive to the person\'s environment';

        // Negatives
        const backNeg = 'rgba(0, 0, 0, 0.65)';
        const backHover = 'rgba(0, 0, 0, 0.85)';
        const backBorder = 'rgba(255, 255, 255, 0.65)';
        // Open
        const openBack = 'rgba(207, 115, 13, 0.65)';
        const openHover = 'rgba(207, 115, 13, 0.85)';
        const openBorder = 'rgba(207, 115, 13, 1)';
        // Conscientiousness
        const consBack = 'rgba(123, 0, 96, 0.65)';
        const consHover = 'rgba(123, 0, 96, 0.85)';
        const consBorder = 'rgba(123, 0, 96, 1)';
        // Extraversion
        const extraBack = 'rgba(161, 0, 22, 0.65)';
        const extraHover = 'rgba(161, 0, 22, 0.85)';
        const extraBorder = 'rgba(161, 0, 22, 1)';
        // Agreeableness
        const agreeBack = 'rgba(0, 131, 16, 0.65)';
        const agreeHover = 'rgba(0, 131, 16, 0.85)';
        const agreeBorder = 'rgba(0, 131, 16, 1)';
        // Neuroticism
        const neuroBack = 'rgba(12, 43, 113, 0.65)';
        const neuroHover = 'rgba(12, 43, 113, 0.85)';
        const neuroBorder = 'rgba(12, 43, 113, 1)';
        this.openData = createTraitData('Openness', data.openness, openBack, backNeg, openHover, backHover, openBorder, backBorder) ;
        this.consData = createTraitData('Conscientiousness', data.conscientiousness, consBack, backNeg, consHover, backHover, consBorder, backBorder);
        this.extraData = createTraitData('Extraversion', data.extraversion, extraBack, backNeg, extraHover, backHover, extraBorder, backBorder);
        this.agreeData = createTraitData('Agreeableness', data.agreeableness, agreeBack, backNeg, agreeHover, backHover, agreeBorder, backBorder);
        this.neuroData = createTraitData('Neuroticism', data.emotional_range, neuroBack, backNeg, neuroHover, backHover, neuroBorder, backBorder);
        const facetOneNames = ['Morality', 'Dutifulness', 'Cautiousness', 'Intellect', 'Altruism'];
        const facetOneCon = [data.morality, data.dutifulness, data.cautiousness, data.intellect, data.altruism];
        const facetOneBack = ['rgba(0, 140, 140, 0.65)', 'rgba(0, 98, 6, 0.65)', 'rgba(233, 108, 0, 0.65)', 'rgba(93, 9, 157, 0.65)', 'rgba(255, 219, 45, 0.65)'];
        const facetOneHover = ['rgba(0, 140, 140, 0.85)', 'rgba(0, 98, 6, 0.85)', 'rgba(233, 108, 0, 0.85)', 'rgba(93, 9, 157, 0.85)', 'rgba(255, 219, 45, 0.85)'];
        const facetOneBorder = ['rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .85)'];
        this.facetOneData = createFacetData(facetOneNames, facetOneCon, facetOneBack, facetOneHover, facetOneBorder);
        const facetTwoNames = ['Anger', 'Immoderation', 'Imagination', 'Liberalism', 'Self-Efficacy'];
        const facetTwoCon = [data.anger, data.immoderation, data.imagination, data.liberalism, data.self_efficacy];
        const facetTwoBack = ['rgba(91, 14, 8, 0.65)', 'rgba(19, 37, 108, 0.65)', 'rgba(13, 99, 210, 0.65)', 'rgba(161, 65, 0, 0.65)', 'rgba(0, 128, 0, 0.65)'];
        const facetTwoHover = ['rgba(91, 14, 8, 0.85)', 'rgba(19, 37, 108, 0.85)', 'rgba(13, 99, 210, 0.85)', 'rgba(161, 65, 0, 0.85)', 'rgba(0, 128, 0, 0.85)'];
        const facetTwoBorder = ['rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .85)'];
        this.facetTwoData = createFacetData(facetTwoNames, facetTwoCon, facetTwoBack, facetTwoHover, facetTwoBorder);
    }

    render() {
        return (
            <CSSTransitionGroup
                transitionName="content"
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={1000}
            >
            <div key={this.id} id="wri-leg">
                <h1 id="leg-text">Writer Legitimacy: <span id="leg">{this.author_legitimacy}</span></h1>
                {/* <h1><span className='trustworthy'>Trustworthy</span><span className='neutral'>Neutral</span><span className='questionable'>Questionable</span><span className='untrustworthy'>Untrustworthy</span></h1> */}
                <div id="big-five">
                    <h2 id="big-five-text">Big Five Personality Traits</h2>
                    <ul id="big-five-list">
                        <TraitGraph name='Openness' help_id='open_help' help_desc={this.open_desc} data={this.openData} />
                        <TraitGraph name='Conscientiousness' help_id='cons_help' help_desc={this.cons_desc} data={this.consData} />
                        <TraitGraph name='Extraversion' help_id='extra_help' help_desc={this.extra_desc} data={this.extraData} />
                        <TraitGraph name='Agreeableness' help_id='agree_help' help_desc={this.agree_desc} data={this.agreeData} />
                        <TraitGraph name='Neuoticism' help_id='neuro_help' help_desc={this.neuro_desc} data={this.neuroData} />
                    </ul>
                </div>
                <div id="facet">
                    <div>
                    <div className="text-and-help-wri">
                        <h2 id="facet-text">Significant Personality Facets</h2>
                        <a data-tip data-for="facet-tool" className="help-logo"><ion-icon name="help-circle-outline" size="small"></ion-icon></a>
                        <ReactTooltip id='facet-tool' place="top" type="dark" effect="solid">
                            <p className="help-text help-facet">Morality: See no need for pretense or manipulation when dealing with others and are therefore candid, frank, and genuine
                            <br/>Dutifulness: Have a strong sense of duty and obligation
                            <br/>Cautiousness: Are disposed to think through possibilities carefully before acting
                            <br/>Intellect: Are intellectually curious and tend to think in symbols and abstractions.
                            <br/>Altruism: Find that helping others and doing things for others is a form of self-fulfillment rather than self-sacrifice.</p>
                        </ReactTooltip>
                        <a data-tip data-for="facet-tool-2" className="help-logo"><ion-icon name="help-circle-outline" size="small"></ion-icon></a>
                        <ReactTooltip id='facet-tool-2' place="top" type="dark" effect="solid">
                            <p className="help-text help-facet">Anger: Have a tendency to feel angry.
                            <br/>Immoderation: Feel strong cravings and urges that they have difficulty resisting, even though they know that they are likely to regret them later.
                            <br/>Imagination: Use fantasy not as an escape but as a way of creating for themselves a richer and more interesting inner-world
                            <br/>Liberalism: Have a readiness to challenge authority, convention, and traditional values.
                            <br/>Self-efficacy: Are confident in their ability to accomplish things.</p>
                        </ReactTooltip>
                    </div>
                    </div>
                    <ul id="facet-list">
                        <div id="list-one">
                            <FacetGraph data={this.facetOneData} />
                        </div>
                        <div id="list-two">
                            <FacetGraph data={this.facetTwoData} />
                        </div>
                    </ul>
                </div>
            </div>
            </CSSTransitionGroup>
        );
    }
}


class TraitGraph extends Component {
    constructor(props) {
        super(props);
        this.options = {
            // maintainAspectRatio: false,
            legend: {
                display: false,
            }
        };
    }

    render() {
        return (
            <div className='big-five-trait'>
                <li className="trait-text">{this.props.name}
                    <a data-tip data-for={this.props.help_id} className="help-logo"><ion-icon name="help-circle-outline" size="small"></ion-icon></a>
                    <ReactTooltip id={this.props.help_id} place="top" type="dark" effect="solid">
                        <p className='help-text'>{this.props.help_desc}</p>
                    </ReactTooltip>
                </li>
                <Pie
                    ref='chart'
                    data={this.props.data}
                    height={150}
                    width={150}
                    options={this.options}
                />
            </div>
        );
    }
}

class FacetGraph extends Component {
    constructor(props) {
        super(props);
        this.options = {
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                        color: 'rgba(255, 255, 255, 1)',
                        zeroLineColor: 'rgba(255, 255, 255, 1)',
                        lineWidth: 1,
                        drawBorder: true,
                        drawOnChartArea: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        fontSize: 10,
                        fontFamily: "'Roboto', sans-serif",
                        fontColor: 'rgba(255, 255, 255, 0.85)',
                        fontStyle: 'normal',
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                        color: 'rgba(255, 255, 255, 1)',
                        zeroLineColor: 'rgba(255, 255, 255, 1)',
                        lineWidth: 1,
                        drawBorder: true,
                        drawOnChartArea: false,
                    },
                    ticks: {
                        fontFamily: "'Roboto', sans-serif",
                        fontColor: 'rgba(255, 255, 255, 0.85)',
                        fontStyle: 'normal',
                    }
                }],
                ticks: {
                    fontColor: 'rgba(255, 255, 255, 0.9)',
                }
            },

        }
    }

    render() {
        return(
            <div className='sig-facet'>
                <HorizontalBar
                    ref='chart'
                    height={250}
                    width={600}
                    data={this.props.data}
                    options={this.options}
                />
            </div>
        );
    }
}

export default WriterLegitimacy;
