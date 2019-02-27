import * as React from 'react';
import {ChangeEvent} from 'react';
import {Paper, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {withStyles} from "@material-ui/core/styles";
import {postFile} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import {IContact} from "../types";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        profileImage: {
            height: 150,
            width: 150,
            margin: '0 auto',
            borderRadius: theme.spacing.unit * 2,
            [theme.breakpoints.down('md')]: {
                height: 100,
                width: 100,
            }
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data: IContact
}

interface IUploadResult {
    message: string
    avatar: string
}

class ImageView extends React.Component<IProps, any> {
    private fileInput: any = undefined

    constructor(props: IProps) {
        super(props)
        this.state = {
            imagePreviewUrl: this.props.data.person.avatar
        }
    }

    public render() {
        const {classes} = this.props
        const {imagePreviewUrl} = this.state
        return (
            <div className={classes.root}>
                <Paper
                    elevation={1}
                    className={classes.profileImage}
                    onClick={this.triggerInputFile}
                >
                    <img src={imagePreviewUrl} alt='Avatar' className={classes.profileImage}/>
                </Paper>
                <br/>
                <input
                    ref={fileInput => this.fileInput = fileInput}
                    type="file"
                    hidden={true}
                    onChange={this.handleFile}
                />

            </div>

        )
    }

    private handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const files = e.target.files;
        if (files) {
            const file = files[0];
            reader.readAsDataURL(file)
            const formData = new FormData()
            formData.append('refrenceId', this.props.data.id)
            formData.append('file', file)
            formData.append('name', "Avatar")
            formData.append('details', "-na-")

            postFile(
                remoteRoutes.contactsAvatar, formData,
                (data: IUploadResult) => {
                    this.setState(() => ({imagePreviewUrl: data.avatar}))
                },
                undefined,
                () => {
                    console.log("Upload complete")
                }
            )
        }
    }

    private triggerInputFile = () => this.fileInput.click()
}

export default withStyles(styles)(ImageView)
