class Listener {
    constructor(playlistsService, mailSender) {
        this._playlistsService = playlistsService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            const songs = await this._playlistsService.getSongsByPlaylistId(playlistId);
            const result = await this._mailSender.sendMail(targetEmail, JSON.stringify({
                playlistId,
                songs,
            }));
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Listener;