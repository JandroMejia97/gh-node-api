import { Router } from 'express';
import { query, validationResult, param } from "express-validator";
import { Octokit } from "@octokit/core";
import githubUsernameRegex from 'github-username-regex';
import toCamelCaseParser from '../utils/toCamelCaseParser.js';
;

const router = Router();



/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get a list of users from GitHub
 *     description: Retrieve a list of users from GitHub, the results are paginated and the default page size is 30 users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/GithubListUser'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ErrorList'
 *   parameters:
 *   - in: query
 *     name: since
 *     style: simple
 *     schema:
 *       type: integer
 *       minimum: 0
 *     description: The integer ID of the last User that you’ve seen.
 *   - in: query
 *     name: per_page
 *     style: simple
 *     schema:
 *       type: integer
 *       maximum: 100
 *       default: 30
 *       minimum: 1
 *     description: Results per page (max 100)
 */
router.get('/users', [
  query('perPage').optional().default(30).isInt({ min: 1, max: 100 }).withMessage('perPage must be an integer between 1 and 100'),
  query('since').optional().isInt({ min: 0 }).withMessage('since must be an integer greater than 0'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const octokit = new Octokit();
    const response = await octokit.request('GET /users', {
      per_page: req.query.perPage,
      since: req.query.since,
    });
    res.send(toCamelCaseParser(response.data));
  }
});

/**
 * @openapi
 * /api/users/{username}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user from GitHub
 *     description: Retrieve a user from GitHub
 *     responses:
 *       200:
 *         description: A user
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/GithubUser'
 *       400:
 *         description: Bad request when the username is not valid
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not found when the user does not exist
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *   parameters:
 *   - in: path
 *     name: username
 *     style: simple
 *     schema:
 *       type: string
 *     description: The username of the user
 */
router.get('/users/:username', [
  param('username').isString().matches(githubUsernameRegex).withMessage('Username must be a valid github username'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const octokit = new Octokit();
    try {
      const response = await octokit.request('GET /users/{username}', {
        username: req.params.username,
      });
      res.send(toCamelCaseParser(response.data));
    } catch (error) {
      if (error.status === 404) {
        res.status(404).send({ error: 'User not found' });
      } else {
        res.status(500).send({ error: 'Something went wrong' });
      }
    }
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     GithubListUser:
 *       type: object
 *       required:
 *        - login
 *        - id
 *        - nodeId
 *        - avatarUrl
 *        - gravatarId
 *        - url
 *        - htmlUrl
 *        - followersUrl
 *        - followingUrl
 *        - gistsUrl
 *        - starredUrl
 *        - subscriptionsUrl
 *        - organizationsUrl
 *        - reposUrl
 *        - eventsUrl
 *        - receivedEventsUrl
 *        - type
 *        - siteAdmin
 *       properties:
 *         login:
 *           type: string
 *           description: The username of the user
 *         id:
 *           type: integer
 *           description: The id of the user
 *         nodeId:
 *           type: string
 *           description: The node id of the user
 *         avatarUrl:
 *           type: string
 *           description: The avatar url of the user
 *         gravatarId:
 *           type: string
 *           description: The gravatar id of the user
 *         url:
 *           type: string
 *           description: The url of the user
 *         htmlUrl:
 *           type: string
 *           description: The html url of the user
 *         followersUrl:
 *           type: string
 *           description: The followers url of the user
 *         followingUrl:
 *           type: string
 *           description: The following url of the user
 *         gistsUrl:
 *           type: string
 *           description: The gists url of the user
 *         starredUrl:
 *           type: string
 *           description: The starred url of the user
 *         subscriptionsUrl:
 *           type: string
 *           description: The subscriptions url of the user
 *         organizationsUrl:
 *           type: string
 *           description: The organizations url of the user
 *         reposUrl:
 *           type: string
 *           description: The repos url of the user
 *         eventsUrl:
 *           type: string
 *           description: The events url of the user
 *         receivedEventsUrl:
 *           type: string
 *           description: The received events url of the user
 *         type:
 *           type: string
 *           description: The type of the user
 *         siteAdmin:
 *           type: boolean
 *           description: The site admin status of the user
 *     GithubUser:
 *       allOf:
 *         - type: object
 *           required:
 *             - name
 *             - email
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the user
 *             company:
 *               type: string
 *               description: The company of the user
 *             blog:
 *               type: string
 *               description: The blog of the user
 *             location:
 *               type: string
 *               description: The location of the user
 *             email:
 *               type: string
 *               description: The email of the user
 *         - $ref: '#/components/schemas/GithubListUser'
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: unknown
 *           description: The error message
 *     ValidationError:
 *       type: object
 *       properties:
 *         value:
 *           type: string
 *           description: The value that failed validation
 *         msg: 
 *           type: string
 *           description: The error message
 *         param:
 *           type: string
 *           description: The parameter that failed validation
 *         location:
 *           type: string
 *           description: The location of the parameter that failed validation, could be body, query or params
 *     ErrorList:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValidationError'
 */


export default router;
