const AUDIO_EXTENSIONS = ['mp3', 'aac'];
const VIDEO_EXTENSIONS = ['mp4', 'm3u8'];

export const clearTags = text => {
    return text
        .replace(/<a.+?href=".+?">.+?<\/a>/g, '')
        .replace(/<.+?>/g, '')
        .replace(/(\s|\n|&nbsp;)/g, ' ')
        .trim();
};

export const getAttachments = text => {
    if (!text) return {};

    const result = {};
    const textMatches = text.match(/<a.+?href=".+?">.+?<\/a>/g);

    if (textMatches) {
        textMatches
            .map(attachment => attachment.match(/<a.+?href="(.+?)">.+?<\/a>/)[1])
            .forEach(attachment => {
                const matches = attachment.match(/^.+\.(.+?)$/);

                const url = matches[0];
                const type = AUDIO_EXTENSIONS.includes(matches[1])
                    ? 'sound'
                    : VIDEO_EXTENSIONS.includes(matches[1])
                    ? 'video'
                    : 'picture';

                if (!result[type]) {
                    result[type] = [];
                }

                result[type].push(url);
            });
    }

    return result;
};

export const getAnswers = data => {
    let answers = data.map(item => {
        let { img, text, question, answer, pos, group } = item;

        pos = Number(pos);
        group = Number(group);

        // Is image (drag images)
        if (img) {
            return { ...item, type: 'picture', url: img };
        }

        // Is match
        if (question && answer) {
            question = clearTags(question);
            answer = clearTags(answer);
            return { ...item, type: 'match', question, answer };
        }

        text = text || '';
        const isAttachment = item.text.match(/<a.+?href=".+?">(.+?)<\/a>/);

        // Is attachment
        if (isAttachment) {
            const attachment = getAttachments(item.text);

            const type = Object.keys(attachment)[0];
            return { ...item, type, url: attachment[type][0], pos, group };
        }

        // Is text
        else {
            const text = clearTags(item.text);
            const type = text.toLowerCase().match(/(yes|no|true|false)/) ? 'true_false' : 'text';

            return { ...item, type, text };
        }
    });

    if (answers.length > 0 && answers[0].type !== 'true_false') {
        answers = answers.sort(() => Math.random() - 0.5);
    }

    return answers;
};

export const getQuestionTypes = question => {
    const answerType = question.data && question.data[0] ? question.data[0].type : '';
    const type = question.q_type;

    if (/\[\[.*?\:section\]\]/g.test(question.q_title)) {
        return 'SSection';
    } else if (/\[\[.*?\:example\]\]/g.test(question.q_title)) {
        return 'SExample';
    } else if (question.q_title.indexOf('ENTRANCE_TEST_STARTER_10') > -1) {
        return 'ahihi';
    } else if (question.q_title.indexOf('ENTRANCE_TEST_STARTER_1') > -1) {
        // các câu hỏi cho placement test sẽ được ưu tiên
        return 'SMatching';
    } else if (question.q_title.indexOf('ENTRANCE_TEST_STARTER_2') > -1) {
        return 'SInputText';
    } else if (question.q_title.indexOf('ENTRANCE_TEST_STARTER_3') > -1) {
        return 'SImagePicker';
    } else if (question.q_title.indexOf('ENTRANCE_TEST_STARTER_4') > -1) {
        return 'SFillColor';
    } else if (question.q_title.indexOf('ENTRANCE_TEST_STARTER_5') > -1) {
        return 'STrueFalse';
    } else if (question.q_title.indexOf('ENTRANCE_TEST_STARTER_6') > -1) {
        return 'SInputText';
    } else if (question.q_title.indexOf('ENTRANCE_TEST_STARTER_7') > -1) {
        return 'SDropText';
    } else if (question.q_title.indexOf('ENTRANCE_TEST_STARTER_8') > -1) {
        return 'SReading';
    } else if (question.q_title.indexOf('ENTRANCE_TEST_STARTER_9') > -1) {
        return 'SInputText';
    } else if (type == 'truefalse') {
        // bắt đầu những câu hỏi bình thường
        return 'TrueFalse';
    } else if (type == 'ddwtos') {
        if (question.q_pictures) {
            return 'DnDTextToImage';
        } else if (question.q_title.includes('[[TF]]')) {
            return 'TrueFalseAdvanced';
        } else if (question.attachments && question.attachments.sound && question.attachments.sound.length > 1) {
            return 'DnDTextToVoice';
        } else if (question.q_text.match(/\[{2}.+?\]{2}/)) {
            if (question.q_text.match(/\[{2}.+?\]{2}/g).length > 1) {
                return 'DragAndDrop';
            }

            return 'PickTexts';
        }
        return 'DragAndDrop';
    } else if (type === 'multichoice') {
        if (answerType == 'sound') {
            return question.q_single_choice == '1' ? 'PickAudio' : 'MultiPickAudio';
        } else if (answerType == 'true_false') {
            return 'TrueFalse';
        } else if (answerType == 'picture') {
            return 'PickPicture';
        }
        return 'PickText';
    } else if (type === 'ddimageortext') {
        if (question.q_title.includes('[[FC]]')) {
            return 'FillColor';
        } else if (answerType == 'picture') {
            return 'SortOrder';
        }
    } else if (type === 'match') {
        if (answerType == 'match') {
            return 'Connection';
        }
    }

    return false;
};
