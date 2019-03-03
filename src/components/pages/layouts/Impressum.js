import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconContactMail from "@material-ui/icons/ContactMail";
import IconEMail from "@material-ui/icons/Email";


const styles = theme => ({
    root: {
        flexGrow: 1,
        minWidth: "100vh",
        marginTop: "24px",
        marginBottom: "36px",
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.primary,
    },
    icon: {
        margin: 2,
        fontSize: 16,
        verticalAlign: "middle",
    },
    bold: {
        fontWeight: "bold",
        marginTop: "12px",
    }
});

class Impressum extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Zoestha UG (haftungsbeschränkt)
                            </Typography>
                            <div> <IconContactMail className={classes.icon} /> Fockestr. 23</div>
                            <div style={{ marginLeft: "26px" }}> 04275 Leipzig</div>
                            <div><IconEMail className={classes.icon} /> info@zoestha.de</div>
                            <div style={{ marginTop: "12px" }}>Geschäftsführer: Sébastien Barré</div>
                            <div>Registergericht: Leipzig, HRB 32943</div>
                            <div>Ust-IdNr: DE308957906</div>

                            <div className={classes.bold}>Website</div>

                            <div>Verantwortlich für die Website: Sébastien Barré</div>
                            <p className={classes.bold}>Haftung für Inhalte</p>

                            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <p className={classes.bold}>Datenschutz</p>

                            Die Nutzung unserer Webseite ist in der Regel ohne eine Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adresse) erhoben werden, erfolgt dies – soweit es möglich ist– immer auf freiwilliger Basis. Wir geben Ihre Daten ohne Ihre ausdrückliche Zustimmung nicht an Dritte weiter. Außerdem weisen wir Sie darauf hin, dass die Datenübertragung im Internet (wie beispielsweise bei der Kommunikation über E-Mail) Sicherheitslücken aufweisen kann. Denn ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. Wir widersprechen hiermit ausdrücklich der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien. Die Betreiber dieser Seiten behalten sich ausdrücklich vor, im Fall der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, rechtliche Schritte einzuleiten.

                            {/* Google Analytics

                            Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. (''Google''). 
                            Google Analytics verwendet sog. ''Cookies'', Textdateien, die auf Ihrem Computer gespeichert werden 
                            und die eine Analyse der Benutzung der Website durch Sie ermöglicht. Die durch den Cookie erzeugten 
                            Informationen über Ihre Benutzung diese Website (einschließlich Ihrer IP-Adresse) wird an einen Server von 
                            Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, 
                            um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten für die Websitebetreiber zusammenzustellen
                             und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google
                              diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese
                               Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung bringen.
                                Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software verhindern; wir weisen Sie jedoch
                                 darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. 
                                 Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor 
                                 beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden. Sie können der Erhebung und Speicherung Ihrer Daten 
                                 jederzeit widersprechen. */}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Impressum.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Impressum);
