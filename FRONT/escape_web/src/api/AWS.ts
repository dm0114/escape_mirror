import AWS from 'aws-sdk';

export default function onFileUpload(e:any) {
    const ACCESS_KEY = 'AKIAQGFLFS7E3FGAA23P';
    const SECRET_ACCESS_KEY = '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';
    const REGION = "ap-northeast-1";
    const S3_BUCKET = '3blood-img-upload';

    // AWS ACCESS KEY를 세팅합니다.
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY
    });

    // 버킷에 맞는 이름과 리전을 설정합니다.
    const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET},
      region: REGION,
    });

    const file = e.target.files[0];

    // 파일과 파일이름을 넘겨주면 됩니다.
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
    };
    
    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
      })
      .send((err) => {
        if (err) console.log(err)
      })
  }