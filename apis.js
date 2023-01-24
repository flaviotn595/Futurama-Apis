GhostJss = process.cwd()
//=============\\
var express = require('express');
var router = express.Router();
var { exec } = require('child_process')
var fetch = require('node-fetch')
var canvacord = require('canvacord').Canvas
const thiccysapi = require('textmaker-thiccy');
const knights = require("knights-canvas");
var fs = require('fs')
const {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./lib/ytdl");

exports.fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => {
  fetch(url, options)
      .then(response => response.json())
      .then(json => {
          // console.log(json)
          resolve(json)
      })
      .catch((err) => {
          reject(err)
      })
})

var criador = ['Ghost-Js']; // Nome do criador
var key = 'sora' //apikey das apis

resposta = { //MSG DE ERRO NO SERVIDOR
    semkey: {
        status: false,
        criador: `${criador}`,
        código: 404,
        mensagem: 
        'insira a apikey na url'
    },
    cdtxt: {
        status: false,
        criador: `${criador}`,
        código: 404,
        mensagem: 
        'nao achei nenhum texto na url'
    },
    cdimg: {
        status: false,
        criador: `${criador}`,
        código: 404,
        mensagem: 
        'Nao Achei Nenhum Link De Imagem Na Url'
    },
    error: {
       status: false,
        criador: `${criador}`,
        mensagem: 
        'ops :/ ocorreu um erro no servidor, tente novamente mais tarde'
    }
}

var keyinvalida = GhostJss + '/paginas/keysemresultado.html' // html key de invalida

async function getBuffer(url) {
  he = await fetch(url).then(c => c.buffer())
   return he
}
async function getJson(url) {
  he = await fetch(url).then(c => c.json())
   return he
}
function getRandom(nans) {
  he = nans[Math.floor(Math.random() * nans.length)]
   return he
}

//===============\\ PLAYS //===============\\
 
router.get('/yt/playmp3', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  musica = req.query.musica
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!musica) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o nome de uma musica valida"})
  ytPlayMp3(musica).then((akk) => {
 res.json({
 status: true,
 código: 200,
 criador: `${criador}`,
 api: "PlayMP3",
 resultado: akk
 })}).catch(e => {
 res.sendFile(error)})})

 router.get('/yt/playlink/mp3', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  link = req.query.link          
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o link"})
  ytDonlodMp3(link).then((akk) => {
 res.json({
 status: true,
 código: 200,
 criador: `${criador}`,
 api: "ytMP3",
 resultado: akk
 })}).catch(e => {
 res.sendFile(error)})})
 
  router.get('/yt/playlink/mp4', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  link = req.query.link          
 if(!acdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o link"})
  ytDonlodMp4(link).then((akk) => {
 res.json({
 status: true,
 código: 200,
 criador: `${criador}`,
 api: "ytMP4",
 resultado: akk
 })}).catch(e => {
 res.sendFile(error)})})
 
  router.get('/yt/playmp4', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  musica = req.query.musica
  if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!musica) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o nome de uma musica valida"})
  ytPlayMp4(musica).then((akk) => {
 res.json({
 status: true,
 código: 200,
 criador: `${criador}`,
 api: "PlayMP4",
 resultado: akk
 })}).catch(e => {
 res.sendFile(error)})})

//===============\\ NSFW //===============\\

router.all('/loli', async (req, res) => {
  var cdapikey = req.query.apikey;
  try {
  if(!cdapikey) return res.json(resposta.semkey)
   if(cdapikey !== key) return res.sendFile(keyinvalida)
  json = JSON.parse(fs.readFileSync('lib/lolis.json').toString())
  random = json[Math.floor(Math.random() * json.length)]
  res.type('png')
  res.send(await getBuffer(random))
  } catch (e) {
  res.send(resposta.error)
  }
  })

router.get('/nsfw/hentai', async (req, res) => {
var cdapikey = req.query.apikey;
try {
if(!cdapikey) return res.json(resposta.semkey)
if(cdapikey !== key) return res.sendFile(keyinvalida)
end = getRandom([,"waifu", "neko"])
let { url } = await getJson(`https://api.waifu.pics/nsfw/${end}`)
let buffer = await getBuffer(url)
res.type('png')
res.send(buffer)
} catch {
res.type('text/json')
res.status(400).send(resposta.error)
}
})

   router.all('/nsfw/loli', async (req, res) => {
   var cdapikey = req.query.apikey;
   try {
   if(!cdapikey) return res.json(resposta.semkey)
  	if(cdapikey !== key) return res.sendFile(keyinvalida)
   json = JSON.parse(fs.readFileSync('lib/nsfwlolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send(resposta.error)
   }
   })
   router.all('*', async (req, res) => {
   res.status(404).json({
            status:404,
            error: 'A página que você está procurando não foi encontrada',
            endpoint: req.path
        })
})
  

module.exports = router
