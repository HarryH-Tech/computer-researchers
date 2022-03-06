import { IResearcher } from './researcher.interface';
import researchers, { Researcher } from './researcher-schema';
import { Request, Response } from 'express';

// LIST ALL RESEARCHERS
export const getAllResearchers = async (req: any, res: any) => {
  researchers.find((err: Error, response: Response) => {
    if (err) {
      res.send(
        'Sorry, there was a problem fetching the list of researchers, please try again.'
      );
    } else {
      res.send(response);
    }
  });
};

// GET SPECIFIC RESEARCHER
export const getResearcher = (req: Request, res: Response) => {
  researchers.findOne(req.params, (err: any, researcher: IResearcher) => {
    res.send(researcher);
  });
};

// CREATE NEW RESEARCHER
export const createResearcher = (req: Request, res: Response) => {
  const request: IResearcher = req.body.researcher!;
  let researcher = new researchers(request);

  researcher
    .save()
    .then((response: any) => {
      res.send('New Researcher Successfully created');
    })
    .catch((err: any) => {
      res.send('Unable to save researcner to database');
    });
};

// DELETE RESEARCHER
export const deleteResearcher = async (req: Request, res: Response) => {
  try {
    researchers.deleteOne(
      { _id: req.body.id },
      function (err: Error, obj: any) {
        if (err) {
          res.send(
            'Sorry, there was an error deleting the selected researcher, pleae try again.'
          );
        }
      }
    );
  } catch (error) {
    res.send(
      'Sorry, there was an error deleting the selected researcher, pleae try again.'
    );
  }
};

// DELETE MULTIPLE RESEARCHERS
export const deleteResearchers = async (req: any, res: any) => {
  try {
    researchers.deleteMany(
      { _id: { $in: req.body.ids } },
      function (err: any, obj: any) {
        res.send(
          'Sorry, there was an error deleting the selected researchers, pleae try again.'
        );
      }
    );
  } catch (error) {
    return res.json({
      error:
        'Sorry, there was an error deleting the selected researchers, pleae try again.',
    });
  }
};

// EDIT RESEARCHER
export const editResearcher = async (req: any, res: any) => {
  try {
    researchers.updateOne(
      {
        _id: req.body.researcher._id,
        name: req.body.researcher.name,
        description: req.body.researcher.description,
        dob: req.body.researcher.dob,
      },
      function (err: any, obj: any) {
        if (err) {
          return res.json({
            error:
              'Sorry, there was an error editing the selected researcher, pleae try again.',
          });
        } else {
          res.send('Edited');
        }
      }
    );
  } catch (error) {
    throw error;
  }
};
