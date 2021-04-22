import React from "react";
import { IconButton, Grid, Divider } from "@material-ui/core";
import Translate from "../components/common/Translate";
import {
	Facebook as FacebookIcon,
	Twitter as TwitterIcon,
	Instagram as InstagramIcon,
	LinkedIn as LinkedInIcon
} from "@material-ui/icons";
import {
	TWITTER_URL,
	INSTAGRAM_URL,
	FACEBOOK_URL,
	LINKEDIN_URL,
} from "../constants";

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer-container">
				<Divider className="footer-divider" />
				<Grid container alignItems="center">
					<Grid item xs={12} container justify="center">
						<IconButton
							href={FACEBOOK_URL}
							component="a"
							target="_blank"
							rel="noreferrer"
							aria-label="Facebook"
						>
							<FacebookIcon style={{ color: "#4267B2" }} />
						</IconButton>
						<IconButton
							href={INSTAGRAM_URL}
							component="a"
							target="_blank"
							rel="noreferrer"
							aria-label="Instagram"
						>
							<InstagramIcon style={{ color: "#8a3ab9" }} />
						</IconButton>
                        <IconButton
                            href={TWITTER_URL}
                            component="a"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Twitter"
                        >
                            <TwitterIcon style={{ color: "#1DA1F2" }} />
                        </IconButton>
						<IconButton
							href={LINKEDIN_URL}
							component="a"
							target="_blank"
							rel="noreferrer"
							aria-label="LinkedIn"
						>
							<LinkedInIcon style={{ color: "#0072b1" }} />
						</IconButton>
					</Grid>
					<Grid item xs={12} container justify="center" className="copy-right">
						<Translate value="common:copyright" />
					</Grid>
				</Grid>
			</footer>
		);
	}
}

export default Footer;
